import React from "react";
import "../../styles/styles.css";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="hero">
      <div className="overlay">
        <h2>{t("titulo")}</h2>
      </div>
    </section>
  );
};

export default Hero;
