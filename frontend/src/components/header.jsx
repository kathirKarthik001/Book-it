import React from 'react'
import Logo from './Logo'
import {Link , useNavigate} from 'react-router-dom'
import {FaSignInAlt , FaSignOutAlt , FaUser } from 'react-icons/fa'
import { useDispatch , useSelector} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
   const {user} = useSelector((state) => state.auth)
   
   const handleLogout =() =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
}

// Register page
   if(!user){
   
        return (
            <>
            <header className='header'>
                <div className="logo">
                    <Link to='/' > <Logo width='70px' /> </Link>
                </div>
        
            
        
                <div>
                    <h1>Register</h1>
                </div>
            
                <Link to='/login'>
                    <div className='login-button'>
                        <FaSignInAlt/>Login       
                    </div>
                </Link>
                
        
            </header>
            </>
        )
   }

   if(user){
        const {role} = user

        if(role === 'admin'){
            return (
                <>
                <header className='header'>
                    <div className="logo">
                        <Link to='/' > <Logo width='70px' /> </Link>
                    </div>
            
                    <ul>
                        <li>
                            Home
                        </li>
                        <li>
                            Events
                        </li>
                        <li>
                            Halls
                        </li>
                    </ul>
                
                    <li>
                        <button className='btn' onClick={handleLogout}>
                            <FaSignOutAlt/> Logout
                        </button>
                    </li>
                    
            
            
            
                </header>
                </>
            )
        }
        else{
            return (
                <>
                <header className='header'>
                    <div className="logo">
                        <Link to='/' > <Logo width='70px' /> </Link>
                    </div>
            
                    <ul>
                        <li>
                            Reserve
                        </li>
                        <li>
                            Events
                        </li>
                        <li>
                            Bookings
                        </li>
                    </ul>
                
                     <button className='btn' onClick={handleLogout}>
                           <FaSignOutAlt/> Logout
                    </button>
                    
                    
            
            
            
                </header>
                </>
            )
        }
   }
  
}

export default Header