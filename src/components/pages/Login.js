import React, { useState } from 'react';
import { AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../../utils/utils';

const Login = () => {

  const [visiblity, setvisiblity] = useState("password")

  const togglePass = () => {
    if (visiblity === "password") {
      setvisiblity("text")
    } else {
      setvisiblity("password")
    }
  }

  const navigate = useNavigate()

  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const copyLoginInfo = { ...loginInfo }
    copyLoginInfo[name] = value;
    setloginInfo(copyLoginInfo)
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      handleError("Feilds Cannot be empty !")
    } else {
      try {
        const url = "http://localhost:8080/auth/login";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo)
        })
        const result = await response.json();
        const { success, message, name, token } = result;
        if (success) {
          handleSuccess(message)
          localStorage.setItem("token", token);
          localStorage.setItem("loggedInUser", name)
          setTimeout(() => {
            navigate("/")
          }, 2000)
        } else {
          handleError(message)
        }
        console.log(result)
      } catch (err) {
        handleError("Somethig Went Wrong")
      }
    }

  }


  return (
    <>
      <div className='flex justify-center'>
        <div className='mt-24 bg-slate-200 p-4 rounded-md'>
          <h1 className='text-2xl font-semibold text-center'>Log in to your Account</h1>
          <form onSubmit={handleLogin} className='w-[350px] mt-6 mx-auto' action="#">
            <div className='w-full flex flex-col my-2'>
              <label className='font-semibold mb-1' htmlFor="email">Enter a Valid Email</label>
              <input value={loginInfo.email} onChange={handleChange} className='py-2 bg-transparent px-3 border-2 border-slate-300 rounded-md outline-none' type="text" placeholder='Enter here...' id='email' name='email' />
            </div>
            <div className='w-full flex flex-col relative my-2'>
              <label className='font-semibold mb-1' htmlFor="password">Create a Password</label>
              <input value={loginInfo.password} onChange={handleChange} className='py-2 bg-transparent inline-block px-3 border-2 border-slate-300 rounded-md outline-none' type={visiblity} placeholder='Enter here...' id='password' name='password' />
              <AiFillEye onClick={togglePass} className={`cursor-pointer absolute text-2xl right-[10px] top-[38px] ${visiblity === "text" ? "text-orange-400" : "text-black"} `} />
            </div>
            <div className='w-full flex flex-col relative my-2'>
              <p className='text-sm'>Don't have an Account? <Link to="/signup" className='text-blue-500 hover:underline'>Signup Here</Link></p>
            </div>
            <div className='text-center w-full mt-8'>
              <input type="submit" className='bg-orange-500 w-full rounded-md py-2 text-white cursor-pointer' value="Login to Account" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
