import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Rotas
import RoutesApp from './routes';

function App() {
  return (
    <Router>
      <RoutesApp />
    </Router>
  );
}

export default App;
