import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/about' element={<About />} />
      </Routes>
    </>
  )
}

export default App
