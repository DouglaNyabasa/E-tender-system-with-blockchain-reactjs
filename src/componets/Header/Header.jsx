import React from 'react'
import './header.css'
import Logo from '../logo/Logo'
import SearchBar from '../Searchbar/SearchBar'
import Navbar from '../Navbar/Navbar'


const Header = () => {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
       <Logo/>
<<<<<<< HEAD
{/* 
       <SearchBar/> */}

=======
       <SearchBar/>
>>>>>>> 28c07a9bac914066249952623b3b14d1168e330c
       <Navbar/>
    </header>
  )
}

export default Header
