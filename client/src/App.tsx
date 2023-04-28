import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Rotas
import RoutesApp from './routes';

import AuthProvider from './Context/aurh';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
