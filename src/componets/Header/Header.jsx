import React from 'react'
import './header.css'
import Logo from '../logo/Logo'
import SearchBar from '../Searchbar/SearchBar'
import Navbar from '../Navbar/Navbar'


const Header = () => {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
       <Logo/>
       <SearchBar/>
       <Navbar/>
    </header>
  )
}

export default Header
