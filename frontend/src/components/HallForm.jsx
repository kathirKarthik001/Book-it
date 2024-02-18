import React ,{useState}from 'react'
import back from '../assets/entypo_back.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function HallForm( {onCancel}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [formData , setFormData ] = useState({
    name:'',
    capacity:'',
    location:'',
    inChargePerson:'',
    contactNumber:'',
    amenities:'a/c'
  })

  const {name , capacity , location , inChargePerson , contactNumber , amenities} = formData

  const onChange =(e) =>{
    setFormData((prevState) =>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onSubmit =(e) =>{
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
     <div className="hall-creater">
        <button className='del-btn' onClick={()=>onCancel()}>
            <h4>Back</h4>
            <img src={back} alt=""/>
        </button> 
      </div>

      <br />

      <form onSubmit={onSubmit} >
        <div className="form-group">
            <input type="text" className="form-control" id='name'name='name'  placeholder='Enter hall name' value={name} onChange={onChange}   />
        </div>
        <div className="form-group">
            <input type="number" className="form-control" id='capacity'name='capacity' 
             placeholder= 'Enter hall capacity' 
            value={capacity} onChange={onChange}      />
        </div>
        <div className="form-group">
            <input type="text" className="form-control" id='location'name='location'  placeholder='Enter hall location' value={location} onChange={onChange}      />
        </div>
        <div className="form-group">
            <input type='text'className="form-control" id='inChargePerson'name='inChargePerson'  placeholder='Enter your inChargePerson' value={inChargePerson}  onChange={onChange}     />
        </div>
        <div className="form-group">
            <input type='tel' className="form-control" id='contactNumber'name='contactNumber'  placeholder='Enter your contactNumber' value={contactNumber}  onChange={onChange}     />
        </div>
        <div className="form-group">
          <select name="amenities" id="amenities" value={amenities} onChange={onChange}>
          <option value="non a/c" >non a/c</option> 
          <option value="a/c">a/c</option>     
          </select>
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block submit r-submit'>
            Submit
          </button>
        </div>
        
      </form>
      
    </>
    
  )
}

export default HallForm