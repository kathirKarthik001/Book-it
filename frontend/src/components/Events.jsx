import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedBookings } from "../features/event/eventSlice";
import Spinner from "../components/Spinner";
import { LuRefreshCcw } from "react-icons/lu";
import { useState } from "react";

function EventComponent() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  const { approvedBookings, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchApprovedBookings());
  }, [refresh]);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="title_card">
        <h2>Approved Events</h2>
        <button
          className="create-btn refresh_btn"
          onClick={() => setRefresh(!refresh)}
        >
          Refresh <LuRefreshCcw />
        </button>
      </div>

      {approvedBookings.length === 0 ? (
        <div className="no_bookings"> No approved events yet. </div>
      ) : (
        <div className="cards_container">
          {approvedBookings.map((booking) => (
            <div key={booking._id} className="card events">
              <div className="card-body">
                <div className="event_title">
                  <h3 className="card-title">{booking.event}</h3>
                </div>
                <p className="card-text">
                  <b>Department:</b> {booking.department}
                </p>
                {/* <p className="card-text"><b>Start Time:</b>{new Date(booking.startTime).toLocaleDateString('en-US')}{'  '}
                            {new Date(booking.startTime).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                    <p className="card-text"><b>End Time: </b>{new Date(booking.endTime).toLocaleDateString('en-US')}{'  '}
                            {new Date(booking.endTime).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p> */}

                <p className="card-text">
                  <b>Start Time:</b>
                  {new Date(Date.parse(booking.startTime)).toLocaleDateString(
                    "en-US",
                    { timeZone: "UTC" }
                  )}{" "}
                  {"  "}
                  {new Date(Date.parse(booking.startTime)).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "UTC",
                    }
                  )}
                </p>
                <p className="card-text">
                  <b>End Time: </b>
                  {new Date(Date.parse(booking.endTime)).toLocaleDateString(
                    "en-US",
                    { timeZone: "UTC" }
                  )}{" "}
                  {"  "}
                  {new Date(Date.parse(booking.endTime)).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "UTC",
                    }
                  )}
                </p>

                <p className="card-text">
                  <b>Coordinator:</b> {booking.coordinator}
                </p>
                <p className="card-text">
                  <b>Venue: </b>
                  {booking.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventComponent;
