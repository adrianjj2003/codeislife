import React, { useEffect, useState } from "react";
import "../../styles/departamentos.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Cambiar de useHistory a useNavigate



const DepartamentosList = () => {
  const { t } = useTranslation();
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null); // Estado para el índice seleccionado
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    )
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos(data.departments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los departamentos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>{t("cargando")}</p>;
  }

  const handleDepartmentClick = (departmentId) => {
  navigate(`/obras/${departmentId}`);  // Navegar con navigate
};

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(departamentos.length - 1, prevIndex + 1)
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else if (event.key === "Tab") {
      // Manejar el Tab si es necesario
    }
  };

  return (
    <ul
      className="departamentos-list"
      onKeyDown={handleKeyDown}
      tabIndex={0} // Aseguramos que la lista misma sea accesible con tab
    >
      {departamentos.map((dept, index) => (
        <li
          key={dept.departmentId}
          className={`departamento-item ${
            selectedIndex === index ? "selected" : ""
          }`} // Agregar clase de selección
          tabIndex={0} // Hacemos que cada li sea accesible
          onFocus={() => setSelectedIndex(index)} // Para manejar el enfoque
          onClick={() => handleDepartmentClick(dept.departmentId)} // Manejar clic
        >
          {dept.displayName}
        </li>
      ))}
    </ul>
  );
};

export default DepartamentosList;
