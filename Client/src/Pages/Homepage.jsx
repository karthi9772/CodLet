import React from 'react'
import RoomForm from '../Components/RoomForm'

const Homepage = () => {
  return (
    <div className='text-3xl text-fuchsia-800 font-bold flex flex-col md:flex-row'>
        <div className='md:w-[50%] md:p-20 p-10'>
            <img src="HomepageImg.jpg" alt="image" />
        </div>
        <div className='md:w-[50%] p-10'>
            <RoomForm />
        </div>
    </div>
  )
}

export default Homepage