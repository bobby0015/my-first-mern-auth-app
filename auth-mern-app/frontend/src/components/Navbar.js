import React from 'react';
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({setisAuthenticated}) => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setisAuthenticated(false);
        navigate("/login", { replace: false })
    }

    return (
        <>
            <header className='flex justify-between items-center px-10 py-3 bg-zinc-900 text-white'>
                <div className=''>
                    <h1 className='font-bold text-2xl text-orange-400 cursor-pointer'>Auth-App</h1>
                </div>
                <div>
                    <nav>
                        <ul className='flex'>
                            <li className='mx-3 font-semibold'><Link className='hover:text-orange-400 transition ease-in-out' to="/">Home</Link></li>
                            <li className='mx-3 font-semibold'><Link className='hover:text-orange-400 transition ease-in-out' to="/about">About</Link></li>
                            <li className='mx-3 font-semibold'><Link className='hover:text-orange-400 transition ease-in-out' to="/services">Services</Link></li>
                            <li className='mx-3 font-semibold'><Link className='hover:text-orange-400 transition ease-in-out' to="/products">Products</Link></li>
                            <li className='mx-3 font-semibold'><Link className='hover:text-orange-400 transition ease-in-out' to="/contact">Contact Us</Link></li>
                        </ul>
                    </nav>
                </div>
                <div>
                    {
                        localStorage.getItem("token") ? (
                            <button onClick={handleLogout} className='py-2 px-5 rounded-md bg-orange-500 hover:bg-orange-400 transition ease-in-out'>Logout</button>
                        ) : (
                            <Link className='py-2 px-5 rounded-md bg-orange-500 hover:bg-orange-400 transition ease-in-out' to="/login">Login</Link>
                        )
                    }
                </div>

            </header>
        </>
    )
}

export default Navbar
