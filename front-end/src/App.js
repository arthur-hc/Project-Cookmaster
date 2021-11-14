import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import InitialPage from './pages/InitialPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<InitialPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
