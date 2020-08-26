import React, { useState, useEffect } from 'react';
import './App.css';
import Formulario from './buscador/Formulario';
import ListadoImg from './buscador/ListadoImg';


function App() {

  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])

  //Paginación
  const [pgActual, guardarPaginaActual] = useState(1)
  const [pgTotal, guardarPaginaTotal] = useState(1)

  //resultados
  const [imgResultados, guardarResultados] = useState(0)

  useEffect(() => {
    if (busqueda === '') return
    const consultarApi = async () => {
      console.log(busqueda)
      const imgPagina = 17
      const key = 'ccc'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgPagina}&page=${pgActual}`


      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)

      //Calcular numero de paginas
      const numPaginas = Math.ceil(resultado.totalHits / imgPagina)
      guardarPaginaTotal(numPaginas)

      guardarResultados(resultado.totalHits)

      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }

    consultarApi()

  }, [busqueda, pgActual])

  //Paginacion Func
  const pgAnterior = () => {
    const anteriorPagina = pgActual - 1
    if (anteriorPagina === 0) return
    guardarPaginaActual(anteriorPagina)
  }

  const pgSiguiente = () => {
    const siguientePagina = pgActual + 1
    if (siguientePagina > pgTotal) return
    guardarPaginaActual(siguientePagina)
  }


  return (
    <>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Formulario
            guardarBusqueda={guardarBusqueda}
          />
        </div>

        <div className="row justify-content-center">
          <p>{imgResultados}</p>

          <ListadoImg
            imagenes={imagenes} />

          {(pgActual === 1) ? null : (
            <button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={pgAnterior}>
              Anterior
            </button>
          )}

          {(pgActual === pgTotal) ? null : (
            <button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={pgSiguiente}>
              Siguiente
            </button>

          )}
        </div>
      </div>
    </>
  );
}

export default App;
