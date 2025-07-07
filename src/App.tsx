import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./presentation/pages/HomePage";
import SearchPage from "./presentation/pages/SearchPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
