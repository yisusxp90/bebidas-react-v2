import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// crear context
export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);

    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });

    const [consultar, guardarConsultar] = useState(false);

    useEffect(() => {
        if(consultar) {
            const obtenerReceta = async () => {
                const {nombre, categoria} = busqueda;
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const recetas = await axios.get(url);
                guardarRecetas(recetas.data.drinks);
            };
            obtenerReceta();
        }
    }, [busqueda, consultar]);

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
};

export default RecetasProvider;