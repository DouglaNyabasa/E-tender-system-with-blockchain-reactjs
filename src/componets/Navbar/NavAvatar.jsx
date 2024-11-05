import React from 'react'
import profile from '../../assets/profile.jpg'


const NavAvatar = () => {
  return (
   <li className='nav-item dropdown pe-3'>
    <a href="" className='nav-link nav-profile d-flex align-items-center pe-0' data-bs-toggle='dropdown'>
        <img src={profile} className='rounded-circle' alt="" />
        <span className='d-none d-md-block dropdown-toggle ps-2'>Simbarashe G Mazango </span>
    </a>
    <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
        <li className='dropdown-header'>
            <h6>Simbarashe Gerald Mazango</h6>
            <span>Administrator</span>
        </li>
        <li>
            <hr className='dropdown-divider'/>
        </li>

        <li>
            <a href="users-profile.html"
            className='dropdown-item d-flex align-items-center'>
                <i className='bi bi-person'></i>
                <span>My Profile</span>
            </a>
        </li>
        <li>
            <hr className='dropdown-divider'/>
        </li>
        <li>
            <a href="users-profile.html"
            className='dropdown-item d-flex align-items-center'>
                <i className='bi bi-gear'></i>
                <span>Account Settings</span>
            </a>
        </li>
        <li>
            <hr className='dropdown-divider'/>
        </li>
        <li>
            <a href="users-profile.html"
            className='dropdown-item d-flex align-items-center'>
                <i className='bi bi-box-arrow-right'></i>
                <span>Logout</span>
            </a>
        </li>
    </ul>
   </li>
  )
}

export default NavAvatar
