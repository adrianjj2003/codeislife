import React, { useRef } from "react";
import instagram from "../../assets/img/instagramLogo.png";
import github from "../../assets/img/githubLogo.webp";
import facebook from "../../assets/img/facebookLogo.png";
import twitter from "../../assets/img/twitterLogo.svg";
import youtube from "../../assets/img/youtubeLogo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  // Refs para logo, texto y redes
  const logoRef = useRef(null);
  const infoRef = useRef(null);
  const redesRefs = useRef([]);

  // Array combinado (logo, texto, redes)
  const focusableRefs = [
    logoRef,
    infoRef,
    ...Array(5)
      .fill()
      .map((_, i) => i),
  ];

  // Navegación con flechas
  const handleKeyDown = (e, index) => {
    let total = focusableRefs.length;
    let nextIndex = index;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      nextIndex = (index + 1) % total;
      e.preventDefault();
    }

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      nextIndex = (index - 1 + total) % total;
      e.preventDefault();
    }

    // Enfocar según índice
    if (nextIndex === 0) logoRef.current.focus();
    else if (nextIndex === 1) infoRef.current.focus();
    else redesRefs.current[nextIndex - 2].focus();
  };

  return (
    <footer className="sticky-bg">
      <div className="textoFooter">
        <p
          className="logo"
          tabIndex="0"
          ref={logoRef}
          onKeyDown={(e) => handleKeyDown(e, 0)}
        >
          M E T &nbsp; M U S E U M
        </p>
        <p tabIndex="0" ref={infoRef} onKeyDown={(e) => handleKeyDown(e, 1)}>
          {t("info")}
        </p>
      </div>
      <div className="redes">
        {[instagram, github, facebook, twitter, youtube].map((icon, i) => (
          <span key={i}>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex="0"
              ref={(el) => (redesRefs.current[i] = el)}
              onKeyDown={(e) => handleKeyDown(e, i + 2)}
            >
              <img src={icon} alt="logo de red social" />
            </a>
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
