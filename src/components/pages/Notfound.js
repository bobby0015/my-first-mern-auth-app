import React from 'react'
import {Link} from "react-router-dom";

const Notfound = () => {
  return (
    <>
    <div className=' py-36 w-full flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-[#9ca3af] text-8xl font-bold'>404</h1>
        <h2 className='font-semibold text-2xl my-2'>Sorry! We couldn't find this Page</h2>
        <Link className='py-2 px-5 rounded-md bg-blue-500 text-white inline-block my-4' to="/">Go Home</Link>
      </div>
    </div>
    </>
  )
}

export default Notfound
