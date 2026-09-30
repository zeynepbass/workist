export const queryKeys = {
  categories: ["categories"],
  me: ["users", "me"],
  user: (id) => ["users", id],
  ads: {
    all: ["ads"],
    list: (filters) => ["ads", "list", filters],
    detail: (id) => ["ads", "detail", id],
  },
  portfolios: {
    all: ["portfolios"],
    list: (filters) => ["portfolios", "list", filters],
    detail: (id) => ["portfolios", "detail", id],
  },
  conversations: {
    all: ["conversations"],
    messages: (partnerId) => ["conversations", partnerId, "messages"],
  },
  orders: {
    all: ["orders"],
    list: (filters) => ["orders", "list", filters],
    detail: (id) => ["orders", "detail", id],
  },
  reviews: {
    list: (filters) => ["reviews", filters],
  },
};
