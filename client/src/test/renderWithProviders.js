import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity }, mutations: { retry: false } },
  });
}

export function renderWithProviders(
  ui,
  { route = "/", path = "*", queryClient = createTestQueryClient(), extraRoutes = [] } = {},
) {
  const result = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={ui} />
          {extraRoutes.map(([routePath, element]) => (
            <Route key={routePath} path={routePath} element={element} />
          ))}
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  return { ...result, queryClient };
}

export const userFixture = (overrides = {}) => ({
  id: "64b000000000000000000001",
  firstName: "Ada",
  lastName: "Lovelace",
  title: "Geliştirici",
  avatarUrl: null,
  rating: { average: 0, count: 0 },
  email: "ada@example.com",
  phone: "",
  about: "",
  skills: [],
  certificates: [],
  ...overrides,
});

export const adFixture = (overrides = {}) => ({
  id: "64b0000000000000000000a1",
  ownerId: "64b000000000000000000001",
  owner: userFixture(),
  serviceType: "Admin Panel",
  title: "Ben, admin paneli yaparım",
  description: "Detaylı açıklama",
  deliveryTime: "3 gün",
  revisionCount: 1,
  price: 300,
  imageUrl: "/uploads/public/ads/x.png",
  addons: { logo: false, sourceCode: false, backgroundMusic: false },
  extras: { fastDelivery: false, fullHd: false },
  category: "software-technology",
  subcategory: "web-application",
  rating: { average: 0, count: 0 },
  createdAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});
