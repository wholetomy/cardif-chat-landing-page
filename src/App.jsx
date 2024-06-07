
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing Page/LandingPage';
import ResetStyles from './Components/Styles/ResetStyles';
import './App.css';

function App() {
  return (
    <>
      <ResetStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
