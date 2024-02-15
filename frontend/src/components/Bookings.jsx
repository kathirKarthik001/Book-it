import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings, deletePendingBooking } from '../features/getBooking/getBookSlice';
import { ToastContainer, toast} from 'react-toastify'; // Import ToastContainer and toast from Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS
import Spinner from '../components/Spinner';
import '../css/userBook.css';

function UserBookingComponent() {
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
    <div>
      <h2>My Bookings</h2>
      <ToastContainer /> {/* Initialize the ToastContainer */}
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        userBookings && userBookings.length > 0 ? (
          <div>
            {userBookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className={`status ${booking.status}`}>
                  <p>Status: {booking.status}</p>
                  {booking.status === 'pending' && (
                    <button onClick={() => handleDelete(booking._id)} className="delete-button">
                      Delete
                    </button>
                  )}
                </div>
                <div className="booking-details">
                  <h3>Event Details:</h3>
                  <p>Event Name: {booking.event.name}</p>
                  <p>Date: {new Date(booking.startTime).toLocaleDateString()}</p>
                  <p>Time: {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}</p>
                  <p>Location: {booking.event.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No bookings found.</div>
        )
      )}
    </div>
  );
}

export default UserBookingComponent;