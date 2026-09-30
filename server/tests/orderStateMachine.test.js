import { describe, expect, it } from "vitest";

import { availableActions, nextStatus, roleOf } from "../services/orderStateMachine.js";

const order = (status, extra = {}) => ({
  status,
  buyer: "buyer-id",
  seller: "seller-id",
  revisionLimit: 1,
  revisionsUsed: 0,
  ...extra,
});

describe("order state machine", () => {
  it.each([
    ["requested", "offer", "seller", "offered"],
    ["requested", "cancel", "buyer", "cancelled"],
    ["requested", "cancel", "seller", "cancelled"],
    ["offered", "offer", "seller", "offered"],
    ["offered", "accept", "buyer", "active"],
    ["active", "deliver", "seller", "delivered"],
    ["active", "cancel", "seller", "cancelled"],
    ["delivered", "request_revision", "buyer", "revision_requested"],
    ["delivered", "complete", "buyer", "completed"],
    ["revision_requested", "deliver", "seller", "delivered"],
  ])("%s --%s by %s--> %s", (status, action, role, target) => {
    expect(nextStatus(order(status), action, role)).toEqual({ allowed: true, status: target });
  });

  it.each([
    ["requested", "accept", "buyer", "INVALID_TRANSITION"],
    ["requested", "offer", "buyer", "FORBIDDEN_ROLE"],
    ["offered", "accept", "seller", "FORBIDDEN_ROLE"],
    ["active", "cancel", "buyer", "FORBIDDEN_ROLE"],
    ["active", "complete", "buyer", "INVALID_TRANSITION"],
    ["delivered", "deliver", "seller", "INVALID_TRANSITION"],
    ["completed", "cancel", "buyer", "INVALID_TRANSITION"],
    ["cancelled", "offer", "seller", "INVALID_TRANSITION"],
  ])("rejects %s --%s by %s (%s)", (status, action, role, reason) => {
    expect(nextStatus(order(status), action, role)).toEqual({ allowed: false, reason });
  });

  it("enforces the revision limit", () => {
    expect(
      nextStatus(order("delivered", { revisionsUsed: 1 }), "request_revision", "buyer"),
    ).toEqual({
      allowed: false,
      reason: "REVISION_LIMIT_REACHED",
    });
  });

  it("lists the actions available to each role", () => {
    expect(availableActions(order("offered"), "buyer")).toEqual(["accept", "cancel"]);
    expect(availableActions(order("offered"), "seller")).toEqual(["offer", "cancel"]);
    expect(availableActions(order("offered"), null)).toEqual([]);
  });

  it("derives the viewer role", () => {
    expect(roleOf(order("requested"), "buyer-id")).toBe("buyer");
    expect(roleOf(order("requested"), "seller-id")).toBe("seller");
    expect(roleOf(order("requested"), "someone-else")).toBeNull();
  });
});
