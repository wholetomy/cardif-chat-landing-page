
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing Page/LandingPage';
import ResetStyles from './Components/Styles/ResetStyles';
import Chat from './Pages/Chat/Chat';

function App() {
  return (
    <>
      <ResetStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
