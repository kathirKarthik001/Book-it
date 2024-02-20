import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import DashBoard from './pages/dashboard'
import Register from './pages/register'
import Login from './pages/login'
import BookingForm from './components/Bookingform';


function App() {
  return (
    <>
    <Router>
      
      <div className="container">
        <Routes>
          <Route path='/' element={<DashBoard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/reserve/:hallId' element={<BookingForm />}/>
        </Routes>
        
      </div>

    </Router>

    <ToastContainer/>

    </>
    
  )
}

export default App