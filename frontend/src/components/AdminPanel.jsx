import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {pendingBookings,adminResponse,reset} from '../features/bookings/bookingSlice'

function AdminPanel() {
  const dispatch = useDispatch()

  const {Bookings , isLoading , isError , isSuccess , message} = useSelector((state) => state.booking)
  const {user} = useSelector((state)=> state.auth)
 
  useEffect(()=>{
    if (user && user.token && user.role === 'admin' && !isSuccess) {
      dispatch(pendingBookings())
      dispatch(reset()) 
    }
  },[])


  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    
    if (isSuccess) {
      dispatch(pendingBookings())
      dispatch(reset()) 
    }

    return () => {
      dispatch(reset())      
    };
  }, [dispatch ,isSuccess, isError, Bookings, message]);

  const handleAction = (action , id) =>{
    const response = action
    dispatch(adminResponse({ BookingID: id, Decision: response }));

    dispatch(pendingBookings())
    dispatch(reset()) 
  
  }


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
                <td>{booking.venue}</td>
                <td>{booking.department}</td>
                <td>
                  {new Date(booking.startTime).toLocaleDateString('en-US')}{' || '}
                  {new Date(booking.startTime).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </td>
                <td>
                  {new Date(booking.endTime).toLocaleDateString('en-US')}{' || '}
                  {new Date(booking.endTime).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </td>
                <td className='btns'>
                <button className='approve_btn' onClick={() => handleAction('approved', booking._id)}>Approve</button>
                <button className='reject_btn' onClick={() => handleAction('rejected', booking._id)}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Pending Bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default AdminPanel;