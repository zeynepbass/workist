import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import AppProviders, { createQueryClient } from "./app/providers/AppProviders";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AppProviders queryClient={createQueryClient()}>
    <App />
  </AppProviders>,
);
