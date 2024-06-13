// import fetch from 'fetch';

// Authentication

export const regUser = async(cred)=>{
    let data = {
        name: cred.name,
        email : cred.email,
        password: cred.password
    }
    const body = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
    
    const resp = await fetch('http://localhost:8080/register',{
        method: 'POST',
        body: body
    })
    if(!resp.ok){
        const error = await resp.text();
        throw new Error(error || 'Failed to add task');
    }
    return resp.json();
}

export const loginUser = async(cred)=>{
   let data = {
    email : cred.email,
    password : cred.password
   }
   const body = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
   const resp = await fetch('http://localhost:8080/login',{
     method: 'POST',
     body: body
   })
   if(!resp.ok){
    const error = await resp.text();
    throw new Error(error || 'Failed to add task');
   }
   const headers = resp.headers;
    const authToken = headers.get('auth-token'); // Retrieve auth-token from headers

    return authToken;
}



export const fetchTasks = async (token) => {
    const resp = await fetch('http://localhost:8080/task/', {
        headers: {
            'Authorization': `Bearer ${token}` // Include bearer token in the headers
        }
    });
    const json = await resp.json();

    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error || 'Failed to add task');
    }

    return json;
}

// export const fetchTasks = async (token) => {
//     const resp = await fetch('http://localhost:8080/task/');
//     const json = await resp.json();

//     if (!resp.ok) {
//         const error = await resp.text();
//         throw new Error(error || 'Failed to add task');
//     }

//     return json.task;
// }

// export const addTask = async (cred,token) => {
//     let {title,description,due,status} = cred;
//     const data = {
//         title: title,
//         description: description,
//         due: due,
//         status: status
//     };

//     const resp = await fetch('http://localhost:8080/task/addTask/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(data)
//     });

//     if (!resp.ok) {
//         const error = await resp.text();
//         throw new Error(error || 'Failed to add task');
//     }

//     return resp.json();
// }

export const addTask = async (cred,token) => {
    let {title,description,due,status} = cred;
    // console.log("cred", cred);
    const data = {
        title: title,
        description: description,
        due: due,
        status: status
    };
    const body = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
    //  console.log(JSON.stringify(data))
    // let val = JSON.stringify(data);
    //  console.log(JSON.parse(val));
    const resp = await fetch('http://localhost:8080/task/addTask/', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: body
    });

    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error || 'Failed to add task');
    }
    let fields = await resp.json();
    // console.log(fields);
    return fields;
}

export const updateTask = async(cred,token)=>{
    const data = {};
    
    // Iterate over the properties of cred and add non-empty ones to data
    for (const [key, value] of Object.entries(cred)) {
        if (value !== undefined && value !== null && value !== '') {
            data[key] = value;
        }
    }

   const resp = await fetch(`http://localhost:8080/task/updateTask/${cred.id}`,{
    method: 'PATCH',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
   });

   if(!resp.ok){
    const error = await resp.text();
    throw new Error(error || 'Failed to update task');
   }
   return resp.json();
}

export const deleteTask = async(id,token)=>{
    // console.log(id);
   const resp = await fetch(`http://localhost:8080/task/${id}`,{
     method: 'DELETE',
     headers:{
       'Authorization': `Bearer ${token}`
     }
   })

   if(!resp.ok){
    const error = await resp.text();
    throw new Error(error || 'Failed to delete the task')
   }
   return resp.json();
}