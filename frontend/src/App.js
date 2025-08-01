import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesPage from './pages/NotesPage'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NotesPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App