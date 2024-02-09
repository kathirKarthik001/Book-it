import React, { useState } from 'react'
import Header from '../components/header'

import AdminPanel from '../components/AdminPanel'
import Reserve from '../components/Reserve'
import Halls from '../components/Halls'
import Bookings from '../components/Bookings'
import Events from '../components/Events'

function dashboard() {
  const [content , setContent ] = useState({
    tab:2
  })

  const {tab} = content
  
  const onChange =(newChoice) =>{
    setContent(() =>({
    tab:newChoice
    }))
  }

  return (
        <>
          <Header onSelect={(newChoice) => onChange(newChoice)} />
          <section className="context">
            {tab === 2 ? (
              <Events />
            ) : tab === 1 ? (
              <AdminPanel />
            ) :tab === 3 ? (
              <Halls />
            ) :tab === 4?(
              <Reserve/>
            ) : (
              <Bookings/>
            )}
          </section>
        </>
  )
}

export default dashboard