import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Hotels from './pages/Hotels'
import AddHotel from './pages/AddHotel'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/addHotel" element={<AddHotel />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
