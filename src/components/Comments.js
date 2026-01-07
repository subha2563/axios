import axios from 'axios';
import React, { useEffect, useState } from 'react'

//MOCK API URL
const API_URL="https://jsonplaceholder.typicode.com/comments"

function Comments() {
     //create a state to store the data from url
    const[comments,Setcomments]=useState([]);

    //useEffect runs when the component  is reloaded
    
    useEffect(()=>{
        axios.get(API_URL)
         .then(res =>{
             Setcomments(res.data.slice(0,3));
        })},[]);
  return (
    <div>
        <h3>Comments List</h3>
            <table className='table table-bordered' >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>BODY</th>
              </tr>
            </thead>
            <tbody>
                {comments.map(comments =>(
                    <tr key={comments.id}>
                        <td>{comments.id}</td>
                        <td>{comments.name}</td>
                        <td>{comments.email}</td>
                        <td>{comments.body}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Comments