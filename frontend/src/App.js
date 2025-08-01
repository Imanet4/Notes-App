import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App