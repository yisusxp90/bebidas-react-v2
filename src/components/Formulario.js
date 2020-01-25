import React, { useContext, useState } from 'react';
import {CategoriasContext} from "../context/CategoriasContext";
import {RecetasContext} from "../context/RecetasContext";

const Formulario = () => {

    const {categorias} = useContext(CategoriasContext);
    const {buscarRecetas, guardarConsultar} = useContext(RecetasContext);
    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    });

    const obtemerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    };

    return (
        <form className="col-12 mt-4" onSubmit={e => {
            e.preventDefault();
            buscarRecetas(busqueda);
            guardarConsultar(true);
        }}>
            <fieldset>
                <legend className="text-center">
                    Busca bebidas por categoria o Ingrediente
                </legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        placeholder="Buscar por Ingrediente"
                        onChange={obtemerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={obtemerDatosReceta}
                    >
                        <option value="">---Selecciona Categoria---</option>
                        {categorias.map(categoria => (
                            <option
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))};
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Recetas"
                    />
                </div>
            </div>
        </form>
    );
}

export default Formulario;