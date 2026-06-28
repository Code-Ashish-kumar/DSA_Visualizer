import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Algorithms from './pages/Algorithms'
import Sorting from './pages/Sorting'
import Searching from './pages/Searching'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/about' element={<About />} />

        <Route path='/algorithms' element={<Algorithms />} />

        <Route path='/algorithms/sorting'  element={<Sorting />} />

        <Route path='/algorithms/search'   element={<Searching />} />
      </Routes>
    </>
  )
}

export default App
