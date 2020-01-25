import React, {useContext, useState} from 'react';
import {ModalContext} from "../context/ModalContext";

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


// posicion del modal
function getModalStyle() {
    const top = 50 ;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

// estilos del modal
const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    // configuracion del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // muestra y formatea los ingredientes
    const mostrarIngredientes = (detalleReceta) => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++){
            if(detalleReceta[`strIngredient${i}`] !== null){
                ingredientes.push(
                    <li>{detalleReceta[`strIngredient${i}`]} {detalleReceta[`strMeasure${i}`]}</li>
                );
            }
        }
        return ingredientes;
    };

    const {guardarIdReceta, detalleReceta, guardarDetalleReceta} = useContext(ModalContext);

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} />
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={ () => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >Ver Receta</button>
                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarDetalleReceta({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{detalleReceta.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {detalleReceta.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={detalleReceta.strDrinkThumb} alt=""/>

                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes(detalleReceta)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Receta;