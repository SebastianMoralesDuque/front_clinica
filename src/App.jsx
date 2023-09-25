import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Routes from './Routes'; // Tu componente de rutas

// Configura el elemento raíz de la aplicación para React Modal
Modal.setAppElement('#root'); // Reemplaza '#root' con el selector del elemento raíz de tu aplicación

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
