import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {fetchTasks,addTask,updateTask,deleteTask} from '../api/api';
import '../styles/style.css'

const TaskList = (token) => {
  // console.log(token)
  const [data,setData] = useState({title:"",description:"",due:"",status:""});
  // const [formData,setFormData] = useState({title:"",description:"",due:"",status:""});
  let tok = token.token
  // console.log(tok);
   const {data: taskData,isLoading,isError,error} = useQuery({
      queryKey: ["tasks",{tok}],
      queryFn: () => fetchTasks(tok),
      staleTime: 1000*60*5
   })
   const queryClient = useQueryClient();
   const {mutate:postMutate} = useMutation({
    mutationFn: (data)=>addTask(data,tok),
    //  mutationFn: (data)=>addTask(tok),
   //   onMutate: ()=>{
   //      return {id:1}
   //   },
     onSuccess:()=>{
      queryClient.invalidateQueries({
       queryKey:["tasks",{tok}],
       exact : true,
      });
   },
   })
   const {mutate:delMutate} = useMutation({
      mutationFn: (id)=>deleteTask(id,tok),
      //  mutationFn: (data)=>addTask(tok),
       onSuccess:()=>{
        queryClient.invalidateQueries({
         queryKey:["tasks",{tok}],
         exact : true,
        });
     },
     })
   const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
   }
   const handleSubmit = (e)=>{
      e.preventDefault();
      // console.log(data);
      // setFormData(data);
      console.log(data);
      postMutate(data);
      // setData({ title: "", description: "", due: "", status: "" });
      // e.target.reset()
   }
   const handleEdit = (id)=>{
      
   }
   const handleDelete = (id)=>{
      delMutate(id)
   }
   // console.log(taskData.task)
  return (
    <>
    <div>
      {isLoading&&<p>Loading...</p>}
      {isError&&<p>{error?.message}</p>}
      {taskData?.task?.map(({ _id, title, description, status, due})=>{
         // let id = task.id;
         // console.log(id);
        return <div key={_id} className='task'>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{status}</p>
            <span>{due}</span>
            <button onClick={()=>handleEdit(_id)}>Edit</button>
            <button onClick={()=>handleDelete(_id)}>Delete</button>
        </div>
      })}
    </div>
    <div>
       <form onSubmit={handleSubmit}>
          <input type="text" name='title' placeholder='Title' onChange={handleChange}/>
          <input type="text" name='description' placeholder='Description' onChange={handleChange}/>
          <input type="text" name='due' placeholder='Due Date' onChange={handleChange}/>
          <input type="text" name='status' placeholder='Status' onChange={handleChange}/>
          <button type='submit'>Add</button>
       </form>
    </div>
    </>
  )
}

export default TaskList
