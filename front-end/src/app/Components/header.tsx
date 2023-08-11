"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export const Header = () => {
  const route=usePathname();
  const router=useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
      };
      const[islogedin,setislogedin]=useState('0');
      //this code will run when the route changes
  useEffect(() => {
    const islogedin = sessionStorage.getItem('islogedin');
    if (typeof window !== 'undefined' && islogedin) {
      setislogedin(islogedin);
      
    }
  }, [route]);
  const[email,setemail]=useState('');
  //save the user name to display it in the header if is loged in
  const[username,setusername]=useState('');
   //this code will run when the route changes
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    const storedusername = sessionStorage.getItem('username');
    //if values are not null in session save the data in states
    if (typeof window !== 'undefined' && storedEmail && storedusername) {
      setemail(storedEmail);
      setusername(storedusername);
    }
  },  [route]);
  //handle logout 
  const logout = () => {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('islogedin');
    sessionStorage.removeItem('username');
    setislogedin('0');
router.push('/');
  };
  return (
   <div>
   <nav className=" pt-4 px-5">
      
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#" className="text-white text-2xl font-semibold">
          Task Manager
        </Link>
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>

        </button>
        <ul className={`hidden lg:flex lg:space-x-4 ${mobileMenuOpen ? 'hidden' : ''}`}>
          <li>
            <Link href="/" className={`text-white py-2  hover:underline  ${route === '/' ? 'underline' : ''}`}>
              Home
            </Link>
          </li>
          {islogedin=='1' &&  (
           <li>
           <Link href="My-Tasks" className={`text-white py-2  hover:underline  ${route === '/My-Tasks' ? 'underline' : ''}`}>
             My Tasks
           </Link>
         </li>
         )}
        

       
          <li>
            <Link href="AboutUs"  className={`text-white py-2  hover:underline  ${route === '/AboutUs' ? 'underline' : ''}`}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="ContactUs"  className={`text-white py-2  hover:underline  ${route === '/ContactUs' ? 'underline' : ''}`}>
              Contact Us
            </Link>
          </li>
         
        </ul>
        <div className="hidden lg:flex items-center space-x-2">
        {islogedin!=='1' &&  (
          <div>
       <Link href="Login" className={`text-white py-2 mx-2 hover:underline  ${route === '/Login' ? 'underline' : ''}`}>
       Login
      </Link>
      <Link href="SignUp" className={`text-white py-2  hover:underline  ${route === '/SignUp' ? 'underline' : ''}`}>
        Sign Up
      </Link>
      </div>
         )}
 {islogedin=='1' &&  (
       <div className="username-container rounded-md bg-gradient-to-r from-blue-300 to-white  flex items-center text-sm px-2 py-2.5 text-center  mb-2">
       <p className="text-gray-600">{username.replace(/"/g, '')}</p>
     </div>
         )}

{/*if is loged in show the logout button */}
          {islogedin=='1' &&  (
          <div>
       <button onClick={logout} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center  mb-2">
       Logout
      </button>
      
      </div>
         )}
            
        </div>
      </div>
     
      <div className={`lg:hidden py-10 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className=" py-2 space-y-2">
          <li className='text-center'>
          <Link href="/" className={`text-white py-2  hover:underline  ${route === '/' ? 'underline' : ''}`}>
              Home
            </Link>
          </li>
        
          {islogedin=='1' &&  (
           <li className='text-center'>
           <Link href="My-Tasks" className={`text-white py-2  hover:underline  ${route === '/My-Tasks' ? 'underline' : ''}`}>
             My Tasks
           </Link>
         </li>
         )}
          <li className='text-center'>
            <Link href="AboutUs"  className={`text-white py-2  hover:underline  ${route === '/AboutUs' ? 'underline' : ''}`}>
              About Us
            </Link>
          </li>
          <li className='text-center'>
            <Link href="ContactUs"  className={`text-white py-2  hover:underline  ${route === '/ContactUs' ? 'underline' : ''}`}>
              Contact Us
            </Link>
          </li>
        </ul>
     {/*if isnt loged in show the login and sign up links */}
      <div className=" lg:hidden   ">
        {islogedin!=='1' &&  (
          <div className='text-center '>
            <div className='pb-2'>
       <Link href="Login" className={`text-white   hover:underline  ${route === '/Login' ? 'underline' : ''}`}>
       Login
      </Link>
      </div>
     
      <Link href="SignUp" className={`text-white   hover:underline  ${route === '/SignUp' ? 'underline' : ''}`}>
        Sign Up
      </Link>
      </div>
         )}


{/*if is loged in show the username */}
 {islogedin=='1' &&  (
       <div className=" rounded-md bg-gradient-to-r from-blue-300 to-white  items-center text-sm px-2 py-2.5 text-center  mb-2">
       <p className="text-gray-600">{username.replace(/"/g, '')}</p>
     </div>
         )}


          {islogedin=='1' &&  (
          <div className='text-center'>
       <button onClick={logout} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center  mb-2">
       Logout
      </button>
      
      </div>
         )}
            
        </div>
        </div>
    </nav>
   
</div>
  )
}
