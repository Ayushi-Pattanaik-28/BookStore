import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className=' h-[75vh] flex flex-col md:flex-row items-center justify-center '>
        <div className=' w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
          <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>Discover Your Next Great Read</h1>
          <p className='mt-4 text-xl text-zinc-400 text-center lg:text-left' ></p>
          <div className='mt-8'>
          <Link to={"/all-books"} className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Discover Books</Link>
          </div>
          
        </div>
        <div className='w-4/6'>
         <img src='https://t3.ftcdn.net/jpg/08/15/70/70/360_F_815707046_XTqisMrQEP4EuW86oMTCsSYYlgSaf1qL.jpg' alt='image'/>
        </div>
    </div>
  )
}

export default Hero;