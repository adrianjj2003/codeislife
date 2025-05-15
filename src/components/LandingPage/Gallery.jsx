import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.css";
import chicaPerla from "../../assets/img/chicaPerla.jpeg";
import elGrito from "../../assets/img/elGrito.png";
import nacimientoVenus from "../../assets/img/nacimientoVenus.webp";
import miguelAngel from "../../assets/img/miguelAngel.jpeg";
import monalisa from "../../assets/img/monalisa.jpeg";
import nefertiti from "../../assets/img/nefertiti.jpeg";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation();

  const images = [
    chicaPerla,
    elGrito,
    nacimientoVenus,
    miguelAngel,
    monalisa,
    nefertiti,
  ];

  const [allVisible, setAllVisible] = useState(false);
  const imgRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !allVisible) {
            setAllVisible(true);
          }
        });
      },
      { threshold: 0.7 }
    );

    imgRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      imgRefs.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, [allVisible]);

  return (
    <section className="destacado">
      <div className="contenedor-grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Obra ${index + 1}`}
            className={allVisible ? "visible" : ""}
            ref={(el) => (imgRefs.current[index] = el)}
          />
        ))}
      </div>
      <Link
        to={{
          pathname: "/descubre",
          state: {
            filterFn: (art) => art.isHighlight && art.primaryImageSmall,
          },
        }}
      >
        <button className="descubre">{t("destacado")}</button>
      </Link>
      <div className="filtro-degradado"></div>
    </section>
  );
};

export default Gallery;
