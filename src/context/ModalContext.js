import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// crear context
export const ModalContext = createContext();

// Provider: donde se encuentran las funciones y state
const ModalProvider = (props) => {

    // crear state del context
    const [idReceta, guardarIdReceta] = useState(null);
    const [detalleReceta, guardarDetalleReceta] = useState({});

    // ejecutar llamado a la api
    useEffect(() => {

        if(idReceta === null) return;

        const obtenerDetalleReceta = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            const detalle = await axios.get(url);
            guardarDetalleReceta(detalle.data.drinks[0]);
        };
        obtenerDetalleReceta();
    }, [idReceta]);

    return (
        <ModalContext.Provider
            value={{
                detalleReceta,
                guardarIdReceta,
                guardarDetalleReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
};
export default ModalProvider;