import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovedBookings } from '../features/event/eventSlice';
import Spinner from '../components/Spinner';

function EventComponent() {
  const dispatch = useDispatch();
  const { approvedBookings, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchApprovedBookings());
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <div>
  <h2>Approved Events</h2>
  {approvedBookings.length === 0 ? (
    <div className="card">
      <div className="card-body">No approved events found.</div>
    </div>
  ) : (
    approvedBookings.map((booking) => (
      <div key={booking._id} className="card events">
        <div className="card-body">
          <h3 className="card-title">{booking.event}</h3>
          <p className="card-text">Coordinator: {booking.coordinator}</p>
          <p className="card-text">Department: {booking.department}</p>
          <p className="card-text">Start Time: {new Date(booking.startTime).toLocaleString()}</p>
          <p className="card-text">End Time: {new Date(booking.endTime).toLocaleString()}</p>
        </div>
      </div>
    ))
  )}
</div>

  );
}

export default EventComponent;
