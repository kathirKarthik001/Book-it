import React, { useEffect, useState } from 'react'
import {getHalls, } from '../features/hall/hallSlice';
import { useDispatch, useSelector  } from 'react-redux';
import {FaTrashAlt , FaEdit } from 'react-icons/fa'
import create from '../assets/gridicons_create.svg'
import {Link} from 'react-router-dom'
import HallForm from './HallForm';
import Spinner from './Spinner'

function Halls() {
  
  const [showForm, setShowForm] = useState(false);


  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const dispatch = useDispatch()
  const {halls , isSuccess , isError, isLoading , message } = useSelector((state) => state.halls)

  useEffect(()=>{
    dispatch(getHalls())
  } , [dispatch])


  const handleEdit= () =>{}
  const handleDelete =() =>{}


  if (isLoading) return <Spinner />;

  return (
    <>
    {showForm ? 

    (<HallForm onCancel={toggleForm} />)
    :
    (
      <>
      <div className="hall-creater">
        <button className='create-btn' onClick={()=>toggleForm()}>
            <img src={create} alt="" />
            <h4> Create Hall</h4>
        </button> 
      </div>
      
      <div className="hall-container">
  

        {isSuccess && halls.map((hall) => (
  
          <div key={hall._id} className="hall-card">
  
            <div className="hall-info">
              <div className='info'>
              <h2>{hall.name}</h2>
              <p>{hall.amenities}</p>
              </div>
              <div className="hall-btns">
                <button onClick={()=> handleEdit(hall._id)} className='hall-info-btn'>
                  <FaEdit/> 
                 </button>
                  
                <button onClick={()=> handleDelete(hall._id) } className='hall-info-btn'>
                  <FaTrashAlt/>
                </button>
              </div>
            </div>
          <hr />
            <div className="hall-details">
              <p> <b>Capacity: </b>{hall.capacity}</p>
              <p><b>Location:</b> {hall.location}</p>
              <p><b>In Charge Person:</b> {hall.inChargePerson}</p>
              <p><b>Contact: </b>{hall.contactNumber}</p>
            </div>
          </div>
        ))}
  
  
      </div>
    </>

    )
    
  }
</>
  )
}

export default Halls