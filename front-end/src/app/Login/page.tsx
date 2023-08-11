"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query';
import { useLoginMutation } from "../Services/taskapi";
export default function Home() {
    const router = useRouter();
    const [login, result] = useLoginMutation();
    

    const initialValues = {
        email: '',
        password: '',
      };
    //validation
      const validationSchema = Yup.object().shape({
        email: Yup.string().required('email is required'),
        password: Yup.string().required('Password is required'),
      });
   
//handle login click button
      const handleLogin = async (values: any) => {
       
        try {
          //request login from the server
          const mutationResult = await login(values);
      //if data response so the user logged in and save settings
          if ('data' in mutationResult) {
            const userData = mutationResult.data;
            sessionStorage.setItem('userEmail', JSON.stringify(values.email));
            sessionStorage.setItem('userid', JSON.stringify(userData.userid));
            sessionStorage.setItem('username', JSON.stringify(userData.username));
            sessionStorage.setItem('islogedin', '1');
            router.push('/');
            alert("Sign in Successful");
          } else if ('error' in mutationResult) {
            const error = mutationResult.error as { message: any; data?: { message: string } };    
            if (error.data) {
              const errorMessage = error.data.message;
              console.log("Error in sign in: ", errorMessage);
              alert("Sign in Failed: " + errorMessage);
            } else {
              console.log("Error in sign in: ", error?.message);
              alert("Sign in Failed");
            }
          }
        } catch (error) {
          console.error("Error during sign up:", error);
          alert("An error occurred during sign up");
        }



      };
   

  return (
    <div className="container mx-auto p-4 py-10">
       
   <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
      <Form className="lg:w-2/5 sm:w-3/5 mx-auto mb-20 p-7 bg-white rounded shadow">
      <h2 className='text-center text-blue-500 text-3xl font-bold py-5'>Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
            Email:
          </label>
          <Field
            type="text"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
            Password:
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white mt-10 mb-2 py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-400"
        >
          Login
        </button>
      </Form>
    </Formik>
  </div>
    
  )
  
  
}



