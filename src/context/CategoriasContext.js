import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// crear context
export const CategoriasContext = createContext();

// Provider: donde se encuentran las funciones y state
const CategoriasProvider = (props) => {

    // crear state del context
    const [categorias, guardarCategotias] = useState([]);

    // ejecutar llamado a la api
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const categorias = await axios.get(url);
            guardarCategotias(categorias.data.drinks);
        };
        obtenerCategorias();
    }, []);

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
};
export default CategoriasProvider;