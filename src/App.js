// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import FrameObrasLista from "./components/FrameObrasLista/FrameObrasLista";
import FrameObrasDepLista from "./components/LandingPage/FrameObrasDepLista";
import ObrasPorContinente from "./components/LandingPage/ObrasContiente";
import SearchResults from "./components/LandingPage/SearchResults";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/descubre" element={<FrameObrasLista />} />
    <Route path="/obras/:departmentId" element={<FrameObrasDepLista />} />
    <Route path="/continente" element={<ObrasPorContinente />} />
    <Route path="/search" element={<SearchResults />} />
  </Routes>
);

export default App;
