import { once } from "node:events";
import http from "node:http";

import { io as connectClient } from "socket.io-client";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import Message from "../models/message.model.js";
import { createSocketServer } from "../sockets/index.js";
import { detachNotifier } from "../sockets/notifier.js";
import { authed, buildApp, createSession } from "./helpers.js";

let app;
let server;
let io;
let baseUrl;
const clients = [];

beforeEach(async () => {
  app = buildApp();
  server = http.createServer(app);
  io = createSocketServer(server);
  server.listen(0);
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterEach(async () => {
  clients.splice(0).forEach((client) => client.close());
  detachNotifier();
  await new Promise((resolve) => io.close(() => resolve()));
});

function connect(token) {
  const client = connectClient(baseUrl, {
    auth: token ? { token } : {},
    transports: ["websocket"],
    reconnection: false,
  });
  clients.push(client);
  return client;
}

async function connected(token) {
  const client = connect(token);
  await once(client, "connect");
  return client;
}

const send = (client, payload) =>
  new Promise((resolve) => client.emit("message:send", payload, resolve));

describe("socket authentication", () => {
  it("rejects connections without a valid token", async () => {
    const anonymous = connect();
    const [error] = await once(anonymous, "connect_error");
    expect(error.message).toBe("UNAUTHORIZED");

    const forged = connect("forged-token");
    const [forgedError] = await once(forged, "connect_error");
    expect(forgedError.message).toBe("UNAUTHORIZED");
  });
});

describe("chat messages", () => {
  it("uses the authenticated sender and only reaches the two participants", async () => {
    const alice = await createSession(app);
    const bob = await createSession(app);
    const eve = await createSession(app);

    const aliceClient = await connected(alice.token);
    const bobClient = await connected(bob.token);
    const eveClient = await connected(eve.token);

    const eveReceived = [];
    eveClient.on("message:new", (message) => eveReceived.push(message));
    const bobReceives = once(bobClient, "message:new");

    const ack = await send(aliceClient, {
      recipientId: bob.user.id,
      text: "Merhaba Bob",
      senderId: eve.user.id,
    });

    expect(ack.ok).toBe(false);
    expect(ack.error.code).toBe("VALIDATION_ERROR");

    const accepted = await send(aliceClient, { recipientId: bob.user.id, text: "Merhaba Bob" });
    const [delivered] = await bobReceives;

    expect(accepted.ok).toBe(true);
    expect(delivered).toMatchObject({ senderId: alice.user.id, recipientId: bob.user.id });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(eveReceived).toHaveLength(0);
  });

  it("rejects messages to yourself or unknown users", async () => {
    const alice = await createSession(app);
    const client = await connected(alice.token);

    const toSelf = await send(client, { recipientId: alice.user.id, text: "selam" });
    const toNobody = await send(client, { recipientId: "507f1f77bcf86cd799439011", text: "selam" });

    expect(toSelf.error.code).toBe("BAD_REQUEST");
    expect(toNobody.error.code).toBe("NOT_FOUND");
  });

  it("throttles bursts of messages", async () => {
    const alice = await createSession(app);
    const bob = await createSession(app);
    const client = await connected(alice.token);

    const results = await Promise.all(
      Array.from({ length: 7 }, () => send(client, { recipientId: bob.user.id, text: "spam" })),
    );

    expect(results.filter((result) => result.ok)).toHaveLength(5);
    expect(results.some((result) => result.error?.code === "TOO_MANY_REQUESTS")).toBe(true);
  });
});

describe("conversation endpoints", () => {
  it("only exposes conversations of the authenticated user", async () => {
    const alice = await createSession(app);
    const bob = await createSession(app);
    const eve = await createSession(app);
    await Message.create({ sender: alice.user.id, recipient: bob.user.id, text: "Selam" });

    const aliceView = await request(app)
      .get("/api/conversations")
      .set(authed(alice.token))
      .expect(200);
    const eveView = await request(app).get("/api/conversations").set(authed(eve.token)).expect(200);
    const eveReadsAlice = await request(app)
      .get(`/api/conversations/${alice.user.id}/messages`)
      .set(authed(eve.token))
      .expect(200);

    expect(aliceView.body.data[0].partner.id).toBe(bob.user.id);
    expect(eveView.body.data).toHaveLength(0);
    expect(eveReadsAlice.body.data).toHaveLength(0);
  });

  it("lets a participant delete a conversation but not a third party", async () => {
    const alice = await createSession(app);
    const bob = await createSession(app);
    const eve = await createSession(app);
    await Message.create({ sender: alice.user.id, recipient: bob.user.id, text: "Selam" });

    await request(app)
      .delete(`/api/conversations/${bob.user.id}`)
      .set(authed(eve.token))
      .expect(204);
    expect(await Message.countDocuments()).toBe(1);

    await request(app)
      .delete(`/api/conversations/${bob.user.id}`)
      .set(authed(alice.token))
      .expect(204);
    expect(await Message.countDocuments()).toBe(0);
  });
});
