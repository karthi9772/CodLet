import React from 'react'
import RoomForm from '../Components/RoomForm'

const Homepage = () => {
  return (
    <div className='pt-16'>
        <div className='text-3xl text-fuchsia-800 font-bold flex flex-col md:flex-row'>
            <div className='md:w-[50%] md:px-20 px-10'>
                <img src="HomepageImg.jpg" alt="image" />
            </div>
            <div className='md:w-[50%] md:px-20 px-10 flex items-center justify-center'>
                <RoomForm />
            </div>
        </div>
    </div>
  )
}

export default Homepage