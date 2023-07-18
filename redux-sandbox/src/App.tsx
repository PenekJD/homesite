import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Homepage from './pages/Homepage';
import Page from './pages/Page';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <div>
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/page" element={<Page />} />
      </Routes>
    </div>
  );
}

export default App;
