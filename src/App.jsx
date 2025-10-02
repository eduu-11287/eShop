import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import About from './pages/About'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'

const App = () => {
  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)

  // geting location
  const getLocation = async ()=> {
    navigator.geolocation.getCurrentPosition(async pos => {
      const {latitude, longitude} = pos.coords
      //console.log(latitude, longitude);

      const url = `/api/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropdown(false)        
      } catch (error) {
        console.log(error);
      }
    })
  }
  useEffect(()=> {
    getLocation()
  },[])
  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
