import React from 'react'

const Edit = () => {
  return (
    <div>
      <form action="" method=''>
        <input type="text" name='title' placeholder='Title' onChange={(e)=>handleChange(e)}/>
        <input type="text" name='description' placeholder='Description' onChange={(e)=>handleChange(e)}/>
        <input type="text" name='due' placeholder='Due Date' onChange={(e)=>handleChange(e)}/>
        <input type="text" name='status' placeholder='Status' onChange={(e)=>handleChange(e)}/>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default Edit
