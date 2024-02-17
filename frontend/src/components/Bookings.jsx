import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings, deletePendingBooking } from '../features/mybookings/myBookingsSlice';
import { ToastContainer, toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Spinner from '../components/Spinner';
import {FaTrashAlt} from 'react-icons/fa'


function Bookings() {
  const dispatch = useDispatch();
  const { userBookings, loading, error } = useSelector((state) => state.userBooking);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deletePendingBooking(token, id);
      dispatch(deletePendingBooking(id));
      toast.success("Pending booking deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className='bookings_container'>
      <h2 >Your Bookings</h2>
      <ToastContainer /> 
      {userBookings.length === 0 ? (
        <div>You haven't done any bookings</div>
      ) : (
        userBookings && userBookings.length > 0 ? 
        (
          <div className="myBookings">

            {userBookings.map((booking) => (

          <div key={booking._id}   className="booking-card">

                <div className={`status ${booking.status}`}>

                  <p className='booking-header'>

                  {booking.status === 'pending' && (
                      <div>Pending</div>
                    )}
                    {booking.status === 'approved' && (
                      <div>Approved</div>
                    )}
                    {booking.status === 'finished' && (
                      <div>Finished</div>
                    )}
                    {booking.status === 'rejected' && (
                      <div>Rejected</div>
                    )}
                    

                    
                   {booking.status === 'pending' && (
                    <button onClick={() => handleDelete(booking._id)} className="delete-button">
                      <FaTrashAlt/>
                    </button>
                     )}

                  </p>
                  <hr/>
                </div>
                <div className="booking-details">
                  <p className='heading'>{booking.event}</p>
                  <p>Start Time : {new Date(booking.startTime).toLocaleDateString('en-US')}{'  '}
                          {new Date(booking.startTime).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                  <p>End Time : {new Date(booking.endTime).toLocaleDateString('en-US')}{'  '}
                          {new Date(booking.endTime).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                  <p>Venue : {booking.venue}</p>
                </div>
              </div>
            ))}
          </div>

        ) : 
        (
          <div>No bookings found.</div>
        )
      )}
    </div>
  );
}

export default Bookings