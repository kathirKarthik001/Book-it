import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {pendingBookings,adminResponse,reset} from '../features/bookings/bookingSlice'

function AdminPanel() {
  const dispatch = useDispatch()
  const {Bookings , isLoading , isError , isSuccess , message} = useSelector((state) => state.booking)
  const {user} = useSelector((state)=> state.auth)
 
  useEffect(()=>{
    
    if(isError){
      console.log(message)
    }    

    if (user && user.token && user.role === 'admin') {
      dispatch(pendingBookings());
    }
    
    return () => {
      dispatch(reset())      
    }
  } , [ dispatch] )


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Hall</th>
            <th>Dept</th>
            <th>Start</th>
            <th>End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Bookings.length > 0 ? (
            Bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.event}</td>
                <td>{booking.hall}</td>
                <td>{booking.dept}</td>
                <td>{booking.start}</td>
                <td>{booking.end}</td>
                <td>{/* Action buttons or elements */}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Pending Bookings</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default AdminPanel;