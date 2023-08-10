"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSignupMutation } from "../Services/taskapi";
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';


const page = () => {
  const user = useSelector((state:any) => state.user);
    const router = useRouter();
    const [signup, result] = useSignupMutation();
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    
      const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required'),
      });
      const handleSignUp = async (values: any) => {
        try {
          const mutationResult = await signup(values);
      
          if ('data' in mutationResult) {
            sessionStorage.setItem('userEmail', JSON.stringify(values.email));
            sessionStorage.setItem('islogedin', '1');
            router.push('/');
            alert("Sign Up Successful");
          } else if ('error' in mutationResult) {
            const error = mutationResult.error as { message: any; data?: { message: string } };    
            if (error.data) {
              const errorMessage = error.data.message;
              console.log("Error in sign up: ", errorMessage);
              alert("Sign Up Failed: " + errorMessage);
            } else {
              console.log("Error in sign up: ", error?.message);
              alert("Sign Up Failed");
            }
          }
        } catch (error) {
          console.error("Error during sign up:", error);
          alert("An error occurred during sign up");
        }
      };
      
      
  return (
    <div>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSignUp}>
      <Form className="lg:w-2/5 sm:4/5 mx-auto p-6 bg-white mt-8 rounded shadow mb-5">
        <div className="mb-4">
        <h2 className='text-center text-blue-500 text-3xl font-bold py-5'>Sign Up</h2>

          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">
            Username:
          </label>
          <Field
            type="text"
            id="username"
            name="username"
            className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
            Email:
          </label>
          <Field
            type="email"
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">
            Confirm Password:
          </label>
          <Field
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-400"
        >
          Sign Up
        </button>
      </Form>
    </Formik>
    </div>
  )
}

export default page