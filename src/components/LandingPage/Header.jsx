import React, { useState, useEffect, useRef } from "react";
import DepartamentosList from "./DepartamentosList";
import iconoBuscar from "../../assets/img/iconoBuscar.png";
import iconoMundo from "../../assets/img/iconoMundo.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Mapa from "./Mapa";
import QuienesSomos from "../QuienesSomos/QuienesSomos";
import SobreNosotros from "../SobreNosotros/SobreNosotros";

import "../../styles/search-lang.css";
import "../../styles/styles.css";

const Header = () => {
  const { t, i18n } = useTranslation();
  const LANGUAGES = {
    es: t("esp"),
    en: t("ing"),
    it: t("it"),
    fr: t("fr"),
  };
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [languageCode, setLanguageCode] = useState("es");
  const [mostrarDepartamentos, setMostrarDepartamentos] = useState(false); //Mostrar/ocultar departamentos
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [mostrarQuienesSomos, setMostrarQuienesSomos] = useState(false); //Mostrar/ocultar mapa
  const [mostrarSobreNosotros, setMostrarSobreNosotros] = useState(false); //Mostrar/ocultar mapa
  const [selectedIndex, setSelectedIndex] = useState(0); //Para navegacion (accesibilidad) en menu lenguaje
  const [filtroDepartamento, setFiltroDepartamento] = useState(
    () => () => true
  );

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setLanguageCode(langCode); // Actualiza el nombre traducido
    document.documentElement.lang = langCode;
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        e.target.id !== "idioma"
      ) {
        setShowDropdown(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        e.target.id !== "buscar"
      ) {
        setShowSearchInput(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = searchRef.current.value;
      if (query) {
        navigate(`/search?query=${query}`);
      }
    }
  };

  const handleMenuKeyDown = (e, index, code) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === Object.keys(LANGUAGES).length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? Object.keys(LANGUAGES).length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      changeLanguage(code);
    }
  };

  return (
    <>
      <header className="main-header">
        <div className="top-bar">
          <div className="search-lang">
            <button
              id="buscar"
              aria-label="Buscar"
              onClick={(e) => {
                e.stopPropagation();
                setShowSearchInput(true);
              }}
            >
              {!showSearchInput && (
                <>
                  <img
                    className="icono-buscar"
                    src={iconoBuscar}
                    alt="buscar"
                  />
                  {t("buscar")}
                </>
              )}
              {showSearchInput && (
                <input
                  type="text"
                  className="search-input"
                  placeholder="Escribe tu búsqueda..."
                  ref={searchRef}
                  id="search-input"
                  autoFocus
                  onKeyDown={handleSearchKeyDown}
                />
              )}
            </button>

            <div className="language-container">
              <button
                id="idioma"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown((prev) => !prev);
                }}
              >
                {/*language*/} {/* Usamos el estado para mostrar el idioma */}
                {
                  <>
                    <img
                      className="icono-mundo"
                      src={iconoMundo}
                      alt="buscar"
                    />
                    {t(LANGUAGES[languageCode])}
                  </>
                }
                <div
                  className="dropdown"
                  id="dropdown"
                  ref={dropdownRef}
                  style={{ display: showDropdown ? "block" : "none" }}
                >
                  <div
                    className="dropdown"
                    id="dropdown"
                    ref={dropdownRef}
                    style={{ display: showDropdown ? "block" : "none" }}
                  >
                    <ul
                      onKeyDown={(e) => {
                        const focusableItems = Array.from(
                          dropdownRef.current.querySelectorAll(
                            "li[tabindex='0']"
                          )
                        );
                        const currentIndex = focusableItems.indexOf(
                          document.activeElement
                        );

                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          const nextIndex =
                            (currentIndex + 1) % focusableItems.length;
                          focusableItems[nextIndex].focus();
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          const prevIndex =
                            (currentIndex - 1 + focusableItems.length) %
                            focusableItems.length;
                          focusableItems[prevIndex].focus();
                        }
                      }}
                    >
                      {Object.entries(LANGUAGES).map(([code, label]) => (
                        <li
                          key={code}
                          tabIndex="0"
                          onClick={() => changeLanguage(code)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              changeLanguage(code);
                            }
                            // Las flechas las captura el UL, no aquí
                          }}
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <h1
              className="logo"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setMostrarDepartamentos(false);
                setMostrarMapa(false);
                setMostrarQuienesSomos(false);
                setMostrarSobreNosotros(false);
                navigate("/");
              }}
          >
            M E T &nbsp; M U S E U M
          </h1>
        </div>

        <nav className="main-nav">
          <button
            className="nav-button"
            onClick={() => {
              setMostrarDepartamentos((prev) => !prev);
              setMostrarMapa(false); // ← cerramos el mapa al abrir departamentos
              setMostrarQuienesSomos(false); // ← cerramos el mapa al abrir departamentos
              setMostrarSobreNosotros(false); // ← cerramos el mapa al abrir departamentos
            }}
          >
            {t("departamentos").toUpperCase()}
          </button>
          <button
            className="nav-button"
            onClick={() => {
              setMostrarMapa((prev) => !prev);
              setMostrarDepartamentos(false);
              setMostrarQuienesSomos(false);
              setMostrarSobreNosotros(false);
            }}
          >
            {t("lugares").toUpperCase()}
          </button>
          <button
            className="nav-button"
            onClick={() => {
              setMostrarQuienesSomos((prev) => !prev);
              setMostrarDepartamentos(false);
              setMostrarMapa(false);
              setMostrarSobreNosotros(false);
            }}
          >
            {t("sobre").toUpperCase()}
          </button>

          <button
            className="nav-button"
            onClick={() => {
              setMostrarSobreNosotros((prev) => !prev);
              setMostrarDepartamentos(false);
              setMostrarMapa(false);
              setMostrarQuienesSomos(false);
            }}
          >
            {t("museo").toUpperCase()}
          </button>
        </nav>
        {mostrarDepartamentos && <DepartamentosList />}
      </header>
      {/* Mostrar Mapa debajo del Header */}
      {mostrarMapa && <Mapa />}
      {mostrarQuienesSomos && <QuienesSomos />}
      {mostrarSobreNosotros && <SobreNosotros />}
    </>
  );
};

export default Header;
