import React from 'react'

const page = () => {
  return (
    <div>
        <div className=" min-h-screen  flex flex-col justify-center items-center py-10 ">
    <div className="container mx-auto text-center px-4 w-3/5 mx-auto p-7 bg-white rounded shadow ">
      <h1 className="text-4xl font-semibold text-blue-500 mb-6">Contact Us</h1>
      <p className="text-gray-700 leading-relaxed mb-8">
          We would love to hear from you! If you have any questions, suggestions, or feedback,
          please feel free to reach out to us using the contact information below.
        </p>
        <div className="text-left">
          <p className="text-gray-700 font-semibold mb-2">Email:</p>
          <p className="text-gray-700 mb-8">
            <a href="mailto:contact@example.com" className="text-blue-500">terromaher@gmail.com</a>
          </p>
          <p className="text-gray-700 font-semibold mb-2">Phone:</p>
          <p className="text-gray-700 mb-8">+96181353038</p>
          <p className="text-gray-700 font-semibold mb-2">Address:</p>
          <p className="text-gray-700 mb-8">
            Lebanon<br />
           
          </p>
        </div>
    </div>
   
  </div></div>
  )
}

export default page