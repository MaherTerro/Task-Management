"use client"
import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAddTaskMutation } from "../Services/taskapi";
import { useEffect, useState } from 'react';
//validation form
const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    duedate: Yup.date().required('Due Date is required'),
  });
 

const CustomModal = ({ isOpen, onRequestClose,  onModalClose }) => {
    //we use this mutation to add task
  const [add, result] = useAddTaskMutation();
   
//on form submit we call this method
    const onSubmit = async (values) => {
        console.log(values)
      try {
        const mutationResult = await add(values);
    
        if ('data' in mutationResult) {
           
          alert("Success")
          onModalClose();
          
        } else if ('error' in mutationResult) {
          alert("error");
        }
      } catch (error) {
        console.error("Error during update:", error);
        alert("An error occurred during update");
      }
    };
    //initial values of form
    const initialValues = {
        userid:sessionStorage.getItem('userid'),
        title: '',
        description: '',
        duedate:'',
      };
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="modal"
    overlayClassName="overlay"
    ariaHideApp={false}
  >
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-gray-900 bg-opacity-75">
      <div className="relative bg-white rounded-lg p-8 shadow-lg w-96">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onRequestClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <h1 className="text-blue-500 text-center text-3xl font-semibold mb-6">
                Add Task
              </h1>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border rounded-lg" 
                />
                {errors.title && touched.title && (
                  <div className="text-red-600">{errors.title}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border rounded-lg" 
                />
                {errors.description && touched.description && (
                  <div className="text-red-600">{errors.description}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="duedate"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Due Date
                </label>
                <Field
                  type="datetime-local"
                  id="duedate"
                  name="duedate"
                  className="w-full px-3 py-2 border rounded-lg" 
                />
                {errors.duedate && touched.duedate && (
                  <div className="text-red-600">{errors.duedate}</div>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
                >
                 Add Task
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </Modal>
  );
};

export default CustomModal;
