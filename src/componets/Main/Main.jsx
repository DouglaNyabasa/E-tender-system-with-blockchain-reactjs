import React from 'react'
import './Main.css'
import PageTitle from '../PageTitle/PageTitle'
import Dashboard from '../Dashboard/Dashboard'

const Main = () => {
  return (
    <main id='main' className='main'>
     <PageTitle page="Admin Dashboard"/>
     <Dashboard/>
    </main>
  )
}

export default Main
