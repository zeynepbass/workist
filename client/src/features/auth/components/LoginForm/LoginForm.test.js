import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { useSessionStore } from "@/shared/session/sessionStore";
import { renderWithProviders, userFixture } from "@/test/renderWithProviders";
import { server } from "@/test/server";
import LoginForm from "./LoginForm";

const renderLogin = () =>
  renderWithProviders(<LoginForm />, { extraRoutes: [["/workist", <p key="home">Ana sayfa</p>]] });

describe("LoginForm", () => {
  it("shows validation errors without calling the API", async () => {
    renderLogin();

    await userEvent.click(screen.getByRole("button", { name: "Giriş Yap" }));

    expect(await screen.findByText("Geçerli bir e-posta girin.")).toBeInTheDocument();
    expect(screen.getByText("Parolanızı girin.")).toBeInTheDocument();
  });

  it("starts an in-memory session and redirects after login", async () => {
    let body;
    server.use(
      http.post("/api/auth/login", async ({ request }) => {
        body = await request.json();
        return HttpResponse.json({ data: { accessToken: "access", user: userFixture() } });
      }),
    );

    renderLogin();
    await userEvent.type(screen.getByLabelText("E-posta"), "ada@example.com");
    await userEvent.type(screen.getByLabelText("Parola"), "secret-password");
    await userEvent.click(screen.getByRole("button", { name: "Giriş Yap" }));

    expect(await screen.findByText("Ana sayfa")).toBeInTheDocument();
    expect(body).toEqual({ email: "ada@example.com", password: "secret-password" });
    expect(useSessionStore.getState()).toMatchObject({
      accessToken: "access",
      status: "authenticated",
    });
    expect(window.localStorage.length).toBe(0);
  });

  it("toggles password visibility without submitting", async () => {
    renderLogin();
    const password = screen.getByLabelText("Parola");

    await userEvent.click(screen.getByRole("button", { name: "Parolayı göster" }));

    await waitFor(() => expect(password).toHaveAttribute("type", "text"));
    expect(screen.queryByText("Geçerli bir e-posta girin.")).not.toBeInTheDocument();
  });
});
