import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useSessionStore } from "@/shared/session/sessionStore";
import { renderWithProviders } from "@/test/renderWithProviders";
import PrivateRoute from "./PrivateRoute";

const renderPrivate = () =>
  renderWithProviders(
    <PrivateRoute>
      <p>Gizli içerik</p>
    </PrivateRoute>,
    { route: "/workist", path: "/workist", extraRoutes: [["/", <p key="login">Giriş sayfası</p>]] },
  );

describe("PrivateRoute", () => {
  it("waits while the session is being restored", () => {
    renderPrivate();
    expect(screen.getByRole("status")).toHaveTextContent("Oturum kontrol ediliyor");
  });

  it("redirects anonymous users to the login page", () => {
    useSessionStore.getState().endSession();
    renderPrivate();
    expect(screen.getByText("Giriş sayfası")).toBeInTheDocument();
  });

  it("renders the page for authenticated users", () => {
    useSessionStore.getState().startSession("token");
    renderPrivate();
    expect(screen.getByText("Gizli içerik")).toBeInTheDocument();
  });
});
