import React, { useEffect, useState } from 'react';
import { AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../../utils/utils';

const Signup = () => {
  const [visiblity, setvisiblity] = useState("password")

  const navigate = useNavigate()

  const togglePass = () => {
    if (visiblity === "password") {
      setvisiblity("text")
    } else {
      setvisiblity("password")
    }
  }

  const [signupInfo, setsignupInfo] = useState({
    name : "",
    email : "",
    password : ""
  })

  const handleChange = (e) =>{
    const {name,value} = e.target;
    const copySignupInfo = {...signupInfo}
    copySignupInfo[name] = value;
    setsignupInfo(copySignupInfo)
  }

  const handleSignup = async (e) =>{
    const {name,email,password} = signupInfo;
    e.preventDefault();
    if(!name || !email || !password){
      return handleError("Fields Cannot be Empty !")
    }else{
      try{
        const url = "http://localhost:8080/auth/signup";
        const response = await fetch(url,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(signupInfo)
        })
        const result = await response.json()
        const {success,message,error} = result;

        if(success){
          handleSuccess(message)
          setTimeout(()=>{
            navigate("/login")
          },3000)
        }else if(error){
          const details = error.details[0].message;
          handleError(details)
        }else{
          return handleError(message)
        }
      }catch(err){
        return handleError(err) 
      }
    }
  }

  return (
    <>
      <div className='flex justify-center'>
        <div className='mt-24 bg-slate-200 p-4 rounded-md'>
          <h1 className='text-2xl font-semibold text-center'>Create an Account</h1>
          <form onSubmit={handleSignup} className='w-[350px] mt-6 mx-auto' action="#">
            <div className='w-full flex flex-col my-2'>
              <label className='font-semibold mb-1' htmlFor="fullname">Enter your Full name</label>
              <input value={signupInfo.name} onChange={handleChange} autoFocus autoComplete='off' className='py-2 bg-transparent px-3 border-2 border-slate-300 rounded-md outline-none' type="text" placeholder='Enter here...' id='fullname' name='name' />
            </div>
            <div className='w-full flex flex-col my-2'>
              <label className='font-semibold mb-1' htmlFor="email">Enter a Valid Email</label>
              <input value={signupInfo.email} onChange={handleChange} autoFocus autoComplete='off' className='py-2 bg-transparent px-3 border-2 border-slate-300 rounded-md outline-none' type="text" placeholder='Enter here...' id='email' name='email' />
            </div>
            <div className='w-full flex flex-col relative my-2'>
              <label className='font-semibold mb-1' htmlFor="password">Create a Password</label>
              <input value={signupInfo.password} onChange={handleChange} autoFocus autoComplete='off' className='py-2 bg-transparent inline-block px-3 border-2 border-slate-300 rounded-md outline-none' type={visiblity} placeholder='Enter here...' id='password' name='password' />
              <AiFillEye onClick={togglePass} className={`cursor-pointer absolute text-2xl right-[10px] top-[38px] ${visiblity === "text" ? "text-orange-400" : "text-black"} `} />
            </div>
            <div className='w-full flex flex-col relative my-2'>
              <p className='text-sm'>Already have an Account? <Link to="/login" className='text-blue-500 hover:underline'>Login Here</Link></p>
            </div>
            <div className='text-center w-full mt-8'>
              <input type="submit" className='bg-orange-500 w-full rounded-md py-2 text-white cursor-pointer' value="Create an Account" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Signup

