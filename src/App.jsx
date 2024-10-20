import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
