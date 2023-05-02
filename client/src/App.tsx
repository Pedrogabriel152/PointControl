import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Rotas
import RoutesApp from './routes';

import AuthProvider from './Context/aurh';

// Toatify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer autoClose={3000}/>
        <RoutesApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
