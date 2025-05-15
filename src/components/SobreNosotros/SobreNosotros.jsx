import React from 'react';
import '../../styles/sobreNosotros.css';

import imagenMuseo from '../../assets/img/imagen_museo.jpg';
import nocheEstrellada from '../../assets/img/noche-estrellada.jpg';
import vermeer from '../../assets/img/woman-with-a-water-jug.jpg';
import monet from '../../assets/img/a-wooden-marsh.jpg';

const SobreNosotros = () => {
    return (
        <>
            <main className="sobre-nosotros">
                <section className="portada">
                    <div className="imagen-superpuesta">
                        <img src={imagenMuseo} alt="Vista del museo" className="imagen-museo" />
                        <div className="overlay"></div>
                        <div className="titulo">
                            <span>MET</span>
                            <span>MUSEUM</span>
                        </div>
                    </div>
                </section>

                <section className="intro-section">
                    <div className="imagen">
                        <img src={nocheEstrellada} alt="La noche estrellada de Van Gogh" />
                    </div>
                    <div className="textoPresentacion">
                        <p>
                            Met Museum es una plataforma digital pensada para acercar el arte a todo el mundo.
                            Nuestro objetivo es simple pero ambicioso: reunir y presentar información sobre obras de arte
                            de todos los rincones del planeta en un solo lugar. Ya sea que busques una pintura renacentista,
                            una escultura precolombina o arte contemporáneo africano, aquí lo encontrarás.
                        </p>
                    </div>
                </section>

                <section className="seccion-medio">
                    <div className="textoPresentacion">
                        <p>
                            Navegar por el arte nunca ha sido tan fácil. Puedes explorar las obras por departamento temático —
                            como pintura, escultura, textiles o arte religioso — o descubrirlas según el continente de origen.
                            Esta doble vía permite tanto una búsqueda estructurada como una más curiosa y libre, ideal para
                            estudiantes, artistas, docentes o cualquier persona con ganas de aprender.
                        </p>
                    </div>
                    <div className="imagen">
                        <img src={vermeer} alt="Mujer con jarra de agua - Vermeer" />
                    </div>
                </section>

                <section className="seccion-final">
                    <div className="imagen">
                        <img src={monet} alt="Nenúfares de Monet" />
                    </div>
                    <div className="textoPresentacion">
                        <p>
                            Pero más allá de catalogar, Met Museum nace con una misión clara: expandir el arte sin barreras.
                            Creemos que la cultura debe ser compartida, no restringida. Por eso, todo el contenido es accesible
                            de forma gratuita, sin suscripciones ni muros de pago. Queremos que cualquier persona, en cualquier
                            parte del mundo, pueda explorar el patrimonio artístico de la humanidad con la misma facilidad
                            que abre una página web.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SobreNosotros;
