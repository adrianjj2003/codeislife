import React from "react";
import "../../styles/quienes-somos.css";
// Assets
import userIcon from "../../assets/img/icono-usuario.jpg";
import githubIcon from "../../assets/img/githubLogo.webp";
import Header from "../LandingPage/Header";
import Footer from "../LandingPage/Footer";

// Integrantes con enlaces a GitHub
const integrantes = [
  {
    nombre: "Adrián Juárez Jiménez",
    descripcion: "Ingeniero Informático graduado en la Universidad Pública de Navarra",
    github: "https://github.com/adrianjj2003",
  },
  {
    nombre: "Hajar Boukhlik",
    descripcion: "Ingeniera Informática graduada en la Universidad Pública de Navarra",
    github: "https://github.com/hajarboukhlik",
  },
  {
    nombre: "Marina Fernández Picorelli",
    descripcion: "Ingeniera Informática graduada en la Universidad Pública de Navarra",
    github: "https://github.com/mfpicorelli",
  },
  {
    nombre: "Iñaki Cerezo Uriz",
    descripcion: "Ingeniero Informático graduado en la Universidad Pública de Navarra",
    github: "https://github.com/InakiCerezoUriz",
  },
];

const QuienesSomos = () => {
  return (
    <>
      <main>
        <div className="contenido-main">
          <section className="intro">
            <h2>QUIÉNES SOMOS</h2>
            <div className="texto-intro">
              <p>
                Somos CodeIsLife, un grupo de cuatro estudiantes del grado en
                Ingeniería Informática en la Universidad Pública de Navarra
                (UPNA).
                <br />
                <br />
                Este proyecto forma parte de nuestro trabajo final y refleja
                nuestro interés por la tecnología, el diseño y la divulgación
                cultural.
                <br />
                <br />
                Además, como parte de nuestra formación hemos desarrollado un
                minijuego interactivo en el que aplicamos programación, diseño y
                creatividad para ofrecer una experiencia entretenida y
                educativa.
              </p>
            </div>
          </section>
          <hr className="separador-cartas" />

          <section className="integrantes">
            {integrantes.map((estudiante, i) => (
              <div key={i} className="carta-estudiante">
                <img
                  src={userIcon}
                  alt={`Foto de ${estudiante.nombre}`}
                  className="avatar"
                />
                <h3>{estudiante.nombre}</h3>
                <p>{estudiante.descripcion}</p>
                <a
                  href={estudiante.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubIcon} alt="Perfil de GitHub" className="icono" />
                </a>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default QuienesSomos;