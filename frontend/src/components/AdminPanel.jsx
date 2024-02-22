import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {pendingBookings,adminResponse,reset} from '../features/bookings/bookingSlice'
import Spinner from '../components/Spinner'

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
    
    // if (isSuccess) {
    //   dispatch(pendingBookings())
    //   dispatch(reset()) 
    // }

    return () => {
      dispatch(reset());
    };
  }, [dispatch ,isSuccess, isError, Bookings, message]);

  // handle admin action
  const handleAction = (action , id) =>{
    const response = action
    dispatch(adminResponse({ BookingID: id, Decision: response }))
    .then(() => {
      dispatch(pendingBookings());
      dispatch(reset());
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <>
    <div className="table-container">
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
          {isLoading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan="6">Error: {message}</td>
            </tr>
          ) : Bookings.length > 0 ? (
            Bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.event}</td>
                <td>{booking.venue}</td>
                <td>{booking.department}</td>
                <td>
                {new Date(Date.parse(booking.startTime)).toLocaleDateString('en-US', { timeZone: 'UTC' })} {' || '}
                {new Date(Date.parse(booking.startTime)).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' })}
                </td>
                <td>
                {new Date(Date.parse(booking.endTime)).toLocaleDateString('en-US', { timeZone: 'UTC' })} {' || '}
                {new Date(Date.parse(booking.endTime)).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' })}
                </td>
                <td className='btns'>
                  <div className='admin-btns'>
                  <button className='approve_btn' onClick={() => handleAction('approved', booking._id)}>Approve</button>
                  <button className='reject_btn' onClick={() => handleAction('rejected', booking._id)}>Reject</button>
                </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6"> No Pending Bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default AdminPanel;
