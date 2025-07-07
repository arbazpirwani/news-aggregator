import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./presentation/pages/HomePage";
import SearchPage from "./presentation/pages/SearchPage";
import { Layout } from "./presentation/components/layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
