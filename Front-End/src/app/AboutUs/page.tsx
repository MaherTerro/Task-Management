import React from 'react'

const page = () => {
  return (
    <div className=" min-h-screen  flex flex-col justify-center items-center py-10 ">
    <div className="container mx-auto text-center px-4 w-3/5 mx-auto p-7 bg-white rounded shadow ">
      <h1 className="text-4xl font-semibold text-blue-500 mb-6">About Us</h1>
      <p className=" leading-relaxed mb-8">
        Welcome to our Task Manager website! We are dedicated to helping you stay organized
        and manage your tasks efficiently. Our mission is to provide you with a user-friendly
        platform that simplifies your task management process and helps you achieve your goals
        more effectively.
      </p>
      <p className=" leading-relaxed mb-8">
        Our team is passionate about productivity and creating tools that make a positive impact
        on your daily life. With our task manager, you can easily create, track, and prioritize
        tasks, set due dates, and mark tasks as completed. We believe that staying organized is
        crucial for personal and professional success, and our platform is designed to support
        you on your journey.
      </p>
      <p className=" leading-relaxed mb-8">
        Whether you're a student, a professional, or anyone looking to manage their tasks more
        efficiently, our task manager is here to help. We value your feedback and continuously
        work to enhance your experience with new features and improvements.
      </p>
      <p className=" leading-relaxed mb-8">
        Thank you for choosing our Task Manager website. We're excited to be part of your
        productivity journey and help you stay on top of your tasks.
      </p>
      <p className="leading-relaxed">
        If you have any questions, suggestions, or feedback, please feel free to contact us
        at <a href="mailto:contact@example.com" className="text-blue-300">terromaher@gmail.com</a>.
      </p>
    </div>
   
  </div>
  )
}

export default page