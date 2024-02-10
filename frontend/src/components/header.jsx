import React from 'react'
import Logo from './Logo'
import {Link , useNavigate} from 'react-router-dom'
import {FaSignInAlt , FaSignOutAlt , FaUser } from 'react-icons/fa'
import { useDispatch , useSelector} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Header({onSelect}) {
   const {user} = useSelector((state) => state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onTouch = (val) =>{
    onSelect(val)
   }



   const handleLogout =() =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
}

// Register page
   if(!user || user.message){
   
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
                        <Link to='/'> <Logo width='70px' /> </Link>
                    </div>
            
                    <ul>
                        <li>
                            <button className='tab' onClick={()=>onTouch(1)}> Home</button>
                        </li>
                        <li>
                            <button className='tab' onClick={()=>onTouch(2)}>Events</button>
                        </li>
                        <li>
                            <button className='tab' onClick={()=>onTouch(3)}>Halls</button>
                        </li>
                    </ul>
                
                    
                    <button className='btn' onClick={handleLogout}>
                            <FaSignOutAlt/> Logout
                   </button>
                
                    
            
            
            
                </header>
                </>
            )
        }
        else if(role === 'user'){
            return (
                <>
                <header className='header'>
                    <div className="logo">
                        <Link to='/' > <Logo width='70px' /> </Link>
                    </div>
            
                    <ul>
                        <li>
                            <button className='tab' onClick={()=>onTouch(4)}>Reserve</button>
                        </li>
                        <li>
                            <button className='tab' onClick={()=>onTouch(2)}>Events</button>
                        </li>
                        <li>
                            <button className='tab' onClick={()=>onTouch(5)}>Bookings</button>
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

//    if(user.message){
//     handleLogout()
//     toast.error('login failed')
//    }
  
}

export default Header