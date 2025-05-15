// src/components/LandingPage/LandingPage.jsx
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Gallery from "./Gallery";
import Footer from "./Footer";
import NoticiasMuseos from "./NoticiasMuseos";
import PopupMuseos from "./PopupMuseos";

const LandingPage = () => (
  <>
    <Header />
    <Hero />
    <NoticiasMuseos />
    <PopupMuseos />
    <Gallery />
    <Footer />
  </>
);

export default LandingPage;
