import React from 'react'
import back from '../assets/entypo_back.svg'

function HallForm( {onCancel}) {
  return (
    <>
     <div className="hall-creater">
        <button className='del-btn' onClick={()=>onCancel()}>
            <h4>Back</h4>
            <img src={back} alt=""/>
        </button> 
      </div>

      <div>HallForm</div>
    </>
    
  )
}

export default HallForm