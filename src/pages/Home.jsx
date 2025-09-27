import React  from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
function Home() {
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
       <nav className="w-full p-4 bg-richblack-800 flex justify-between items-center">
        <Link to="/calendar" className='ml-4 text-blue-100 font-semibold border border-blue-100 px-4 py-2 rounded-md hover:bg-blue-100 hover:text-richblack-900 transition duration-300'>
          <span>Calendar</span>
         </Link>
       <div className='flex'>
        <Link to="/login" 
        className="text-blue-100 font-semibold border border-blue-100 px-4 py-2 rounded-md hover:bg-blue-100 hover:text-richblack-900 transition duration-300">
        <span>Login</span>
        </Link>
         <Link to="/signup" className='ml-4 text-blue-100 font-semibold border border-blue-100 px-4 py-2 rounded-md hover:bg-blue-100 hover:text-richblack-900 transition duration-300'>
          <span>Sign Up</span>
         </Link>
         </div>
       </nav>
       <div className='flex flex-col items-center justify-center flex-grow px-4 bg-richblack-900'>
            <h1 className='text-4xl font-bold text-center  text-richblack-5 fade-slide-in'>
                Welcome to the Event Management App
            </h1>
        <p className='text-center mt-4 text-richblack-200 fade-slide-in' style={{ animationDelay: '0.5s' }}>
            Manage your events efficiently and effortlessly.
        </p>
       </div>
    </div>
  )
}

export default Home