/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeBooking, clearMessage } from '../features/book/bookslice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

const BookingForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.book.isLoading);
  const isError = useSelector((state) => state.book.isError);
  const isSuccess = useSelector((state) => state.book.isSuccess);
  const message = useSelector((state) => state.book.message);

  const [bookingInfo, setBookingInfo] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    coordinator: '',
    department: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully Booked..');
      onCancel();
      dispatch(clearMessage());
    }
  }, [isError, isSuccess, message, onCancel, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!bookingInfo.eventName || !bookingInfo.startDate || !bookingInfo.endDate || !bookingInfo.coordinator || !bookingInfo.department || !bookingInfo.startTime || !bookingInfo.endTime) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    // Convert start time and end time to Date objects
    const startDateTime = new Date(`${bookingInfo.startDate}T${bookingInfo.startTime}`);
    const endDateTime = new Date(`${bookingInfo.endDate}T${bookingInfo.endTime}`);
  
    const bookingData = {
      event: bookingInfo.eventName,
      coordinator: bookingInfo.coordinator,
      department: bookingInfo.department,
      startTime: startDateTime,
      endTime: endDateTime
    };
  
    try {
      await dispatch(makeBooking(bookingData));
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to make booking. Please check your input.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="eventName">Event Name</label>
        <input
          type="text"
          name="eventName"
          value={bookingInfo.eventName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={bookingInfo.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          name="endDate"
          value={bookingInfo.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="coordinator">Coordinator</label>
        <input
          type="text"
          name="coordinator"
          value={bookingInfo.coordinator}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input
          type="text"
          name="department"
          value={bookingInfo.department}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={bookingInfo.startTime}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="endTime">End Time</label>
        <input
          type="time"
          name="endTime"
          value={bookingInfo.endTime}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
