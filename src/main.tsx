import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { QueryProvider } from "./presentation/providers/QueryProvider";
import { DependencyProvider } from "./context/DependencyProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <DependencyProvider>
        <App />
      </DependencyProvider>
    </QueryProvider>
  </React.StrictMode>,
);
