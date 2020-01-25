import React from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import CategoriasProvider from "./context/CategoriasContext";
import RecetasProvider from "./context/RecetasContext";
import ListarRecetas from "./components/ListarRecetas";
import ModalProvider from "./context/ModalContext";

function App() {

  return (
      <CategoriasProvider>
          <RecetasProvider>
              <ModalProvider>
                  <Header/>
                  <div className="container">
                      <div className="row">
                          <Formulario/>
                      </div>

                      <ListarRecetas/>
                  </div>
              </ModalProvider>
          </RecetasProvider>
      </CategoriasProvider>
  );
}

export default App;
