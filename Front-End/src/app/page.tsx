"use client";
import Image from 'next/image'
import {Header} from './Components/header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router=useRouter();
  const[email,setemail]=useState('');
  
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (typeof window !== 'undefined' && storedEmail) {
      setemail(storedEmail);
    }
  }, []);
//here is the get started button to check if user is logged in route to my tasks page,if not go to sign up
  function getstarted(){
   
    if(!email){
      router.push('/SignUp') 
      }else router.push('/My-Tasks')
  }

  return (
    <div className="container mx-auto p-4">
 

<main className="container mx-auto px-1 py-12">
  <section className="my-3">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className='my-2'>
        <h2 className="text-2xl font-semibold mb-6 text-white font-serif ">General Information</h2>
        <p className="text-gray-600 text-lg text-white antialiased">
        Stay organized and manage your tasks efficiently with Task Manager. Keep track of
    important deadlines, and easily categorize your tasks for improved
    productivity. With Task Manager, you can focus on what matters most and stay on top of your
    to-do list.
        </p>
        <div className='sm:text-center hidden sm:block lg:text-start'>
        <button className=" mt-10 bg-blue-500 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring focus:border-blue-400" onClick={() =>getstarted() }>
      Get Started
    </button>
    </div>
  
      </div>
      
      <div>
        <img className='w-11/12 ml-6' src="image.png" alt="Task Manager" />
      </div>
      <div className='text-center lg:hidden'>
        <button className=" mt-10 bg-blue-500 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring focus:border-blue-400"  onClick={() =>
         getstarted()
          }>
      Get Started
    </button>
    </div>
    </div>

   
  </section>
</main>
   
  </div>
    
  )
  function getRemainingTime(dueDate: string | number | Date) {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(due.getTime() - now.getTime());
  
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  
    if (diffDays === 0 && diffHours === 0) {
      return 'Due now';
    } else if (diffDays === 0) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} left`;
    } else if (diffHours === 0) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} left`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} and ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} left`;
    }
  }
  
}

