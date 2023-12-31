"use client";
import Image from 'next/image'
import Modal from '../Components/Modal';
import Modaladd from '../Components/ModalAdd';
import { useEffect, useState } from 'react';
import { useTasksMutation } from "../Services/taskapi";
import { useDeleteTaskMutation } from "../Services/taskapi";
import { useCompleteTaskMutation } from "../Services/taskapi";
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
export default function Home() {
 
  const [tasks, result] = useTasksMutation();

  const [deletetask , deleteresult] = useDeleteTaskMutation();
  const [completetask , comresult] = useCompleteTaskMutation();
 

  const [tasksList, setTasksList] = useState([]);
  const[wantupdate,setwantupdate]=useState(false);
  const[wantupdateitem,setwantupdateitem]=useState(null);
  const[wantadd,setwantadd]=useState(false);
  const[fetch,setfetch]=useState(false);
  const[loading,setloading]=useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

 //first we initialize a router
  const router2 = useRouter();
  //check if loged in
  const isloged = sessionStorage.getItem('islogedin');
  //if not loged alert + navigate to home
  if(isloged==='0' || isloged==null){
    alert("You need to login or sign up in order to Use My tasks Page")
    router2.push('/');
  }
  useEffect(() => {

    const fetchData = async () => {
      //before fetching check user if its still loged in
      const isloged = sessionStorage.getItem('islogedin');
      const userid = sessionStorage.getItem('userid');

      if (isloged === '1' && userid) {
        const mutationResult = await tasks(userid); 
        if ('data' in mutationResult) {
          setTasksList(mutationResult.data); 
        }
      }
    };

    fetchData();
  }, [] );
  //fetch data if wantupdatestate change
  useEffect(() => {
    const fetchData = async () => {
      const isloged = sessionStorage.getItem('islogedin');
      const userid = sessionStorage.getItem('userid');

      if (isloged === '1' && userid) {
        const mutationResult = await tasks(userid); 
        if ('data' in mutationResult) {
          setloading(false)
          setTasksList(mutationResult.data); 
        }
      }
    };

    fetchData();
  }, [wantupdate]);

    //fetch data if wantaddstate change

  useEffect(() => {
    const fetchData = async () => {
      const isloged = sessionStorage.getItem('islogedin');
      const userid = sessionStorage.getItem('userid');

      if (isloged === '1' && userid) {
        const mutationResult = await tasks(userid); 
        if ('data' in mutationResult) {
          setTasksList(mutationResult.data); 
        }
      }
    };

    fetchData();
  }, [wantadd]);
  //fetch data if fetch state change
  useEffect(() => {
    const fetchData = async () => {
      const isloged = sessionStorage.getItem('islogedin');
      const userid = sessionStorage.getItem('userid');

      if (isloged === '1' && userid) {
        const mutationResult = await tasks(userid); 
        if ('data' in mutationResult) {
          setTasksList(mutationResult.data); 
        }
      }
    };

    fetchData();
  }, [fetch]);
  //delete task function
  async function handleDelete(task: any) {
    const shouldDelete = window.confirm("Are you sure you want to delete this task?");
  
    if (shouldDelete) {
      try {
        //delete task request
        await deletetask(task._id);
        //change fetchstate in order to get all tasks again
        setfetch(!fetch);
        
      
        alert("Task deleted successfully");
      } catch (error) {
        console.error("Error during task deletion:", error);
        alert("An error occurred during task deletion");
      }
    }
  }
  //complete button function
  async function handleComplete(task: any) {
    const shouldCOMPLETE = window.confirm("Are you sure you want to Set this task Completed?");
  
    if (shouldCOMPLETE) {
      try {
        //complete task request 
        await completetask(task._id);
        setfetch(!fetch);
        
      
        
      } catch (error) {
        console.error("Error during task completion:", error);
        alert("An error occurred during task completion");
      }
    }
  }
//handle update button with the task you need to update it
  function handleUpdate(task:any) {
    setwantupdate(true);
setwantupdateitem(task);
  }
  //handle add click to open the modal of add task
  function handleAdd() {
    setwantadd(true);

  }
   //handle close update modal 
  const handleCloseModalUpdate = () => {
    setwantupdate(false);
  };
   //handle close add task modal 
  const handleCloseModaladd = () => {
    setwantadd(false);
  };
//calculation for pagination
  const totalPages = Math.ceil(tasksList.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const tasksToShow = tasksList.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="container mx-auto p-5">
<div className='flex justify-between items-center mb-4'>
  <h1 className="text-3xl text-center text-white  font-serif ">My Tasks</h1>
  {/* add task button */}
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none flex items-center" onClick={() => handleAdd()}
  >
    <svg
      className="w-4 h-4 mr-2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 2L12 12M12 22L12 12M12 12L22 12M2 12L12 12" />
    </svg>
    Add Task
  </button>
</div>

    <ul className="bg-white rounded-lg shadow p-5">
{/* if is still fetching data from the server show the loading spinner */}
    {loading==true && ( 
      
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )}


{/* if the tasks to show length is 0 and its finished fetching from the server ,show message you dont have any tasks,if no show the tasks */}
    {tasksToShow.length === 0 && loading!=true ? ( 
      <p className="text-gray-600 text-center text-xl py-40">You don't have any tasks to do.</p>
    ) : (
    tasksToShow.map((task: any) => (
    <li key={task._id} className="border-b p-8 flex justify-between items-start ">
    <div className="flex flex-col p-3">
    <h2 className="text-xl font-semibold pb-4">{task.title}</h2>
    <p className="text-gray-600 text-base">Description: {task.description}</p>
    <p className="text-gray-600">Due:  {format(new Date(task.duedate), 'MMMM d, yyyy, HH:mm:ss')}</p>
    </div>
    <div className="flex flex-col items-center ml-4 w-52">


     



    <p className="text-gray-400">{getRemainingTime(task.duedate)}</p>
    <div className=' flex items-center justify-between py-1'>
    
    <button className='mr-20 ' onClick={() => handleUpdate(task)}>
    <svg className="feather feather-edit" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </button>
    <button className='' onClick={() => handleDelete(task)}>
    <svg width="30" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z" fill="#0D0D0D"/></svg>   
    </button>
    </div>
    <div>
      {/*if task is not completed show a enabled button  else show a disabled button */}
  {!task.iscompleted ? (
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none mt-2" onClick={() => handleComplete(task)}
    >
      Complete
    </button>
    
  ) : (
    
    <button
      className="bg-green-300 text-white font-semibold py-2 px-4 rounded-full focus:outline-none mt-2 cursor-not-allowed"
      disabled
    >
      Completed
    </button>
  )}
</div>

    </div>
    </li>

      ))
    )}
    </ul>
     {/*if wantupdate state is true open the update  modal,and here we have included a methods to close it and reset the states */}
    {wantupdate && (
        <Modal
          isOpen={wantupdate !== null}
          onRequestClose={handleCloseModalUpdate}
          item={wantupdateitem}
          onModalClose={() => {
            setwantupdate(false); 
            setwantupdateitem(null); 
          }}
        />
      )}
      {/*if wantadd state is true open the add modal,and here we have included a methods to close it and reset the states */}
       {wantadd && (
        <Modaladd
          isOpen={wantadd !== null}
          onRequestClose={handleCloseModaladd}
         
          onModalClose={() => {
            setwantadd(false); 
            
          }}
        />
      )}
      {/*Pagination code */}
     <div className="flex justify-center mt-4">
  {currentPage > 1 ? (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Previous
    </button>
  ) : (
<button
      className="bg-blue-300  text-white font-semibold py-2 px-4 rounded-full focus:outline-none cursor-not-allowed"
     
    >
      Previous
    </button>


  )



}
  <div className="ml-4 flex space-x-2">
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        className={`${
          currentPage === index + 1
            ? 'bg-blue-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-semibold py-2 px-4 rounded-full focus:outline-none`}
        onClick={() => setCurrentPage(index + 1)}
        disabled={currentPage === index + 1}
      >
        {index + 1}
      </button>
    ))}
  </div>
  {tasksList.length > indexOfLastTask ? (
    <button
      className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </button>
  ) : (
    <button
    className="ml-4  bg-blue-300 text-white font-semibold py-2 px-4 rounded-full focus:outline-none cursor-not-allowed" 
  >
    Next
  </button>

)}
  
</div>
    </div>
  )
  {/*function to retrieve the remaining due time and date for a task */}
  function getRemainingTime(dueDate: string | number | Date) {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(due.getTime() - now.getTime()); 
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
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



