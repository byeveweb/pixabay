import React, { useState } from 'react';
import Error from './../error/Error'

const Formulario = ({ guardarBusqueda }) => {

    const [termino, guardarTermino] = useState('')
    const [error, showError] = useState(false)

    const buscarImagenes = e => {
        e.preventDefault()

        //Validar
        if (termino.trim() === '') {
            showError(true)
        }
        showError(false)

        //enviar formulario
        guardarBusqueda(termino)
    }

    return (<form
        onSubmit={buscarImagenes}
    >
        <div className="row">
            <div className="form-group col-md-8">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Busca una imagen, ejemplo: futbol o café"
                    onChange={e => guardarTermino(e.target.value)}

                />
            </div>
            <div className="form-group col-md-4">
                <input
                    type="submit"
                    className="btn btn-lg btn-danger btn-block"
                    value="Buscar"
                />
            </div>
        </div>
        {error ? <Error mensaje="dime tu busqueda" /> : null}

    </form>);
}

export default Formulario;