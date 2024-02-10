import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
function Reserve() {

  
  return (
    <>
    <div >
      <h3>
       Reserve Halls
      </h3>
      <div className="card">
        <h1 className='hall-element'>
          Hall
        </h1>
        <h5 className='h5-element'>
          Capacity :
        </h5>
        <h5 className='h5-element'>
          Location :
        </h5>
        <h5 className='h5-element'>
         Incharge :
        </h5>
        <h5 className='h5-element'>
         Contact  :
        </h5>
          <Link to='/reserveForm' className='btn-reserve'>
          Book Now
          </Link>

      </div>
    </div>
    </>
  )
}

export default Reserve