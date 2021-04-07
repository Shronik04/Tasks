import React, { useState } from 'react'
import { useHistory} from 'react-router';


import axios from 'axios'
function Add() {

    const [newb, setNewb] = useState({
        title: "",
        description:""
    })
    const history = useHistory();

    const addBlog = (e) => {
        e.preventDefault();
      newb&&  axios.post(`http://localhost:5000/addblog`, newb)
            .then(res => {
                console.log(res);
                alert("Added")
          history.push("/")
            })
            .catch(err => {
            console.log(err);
        })
    }

    

    return (
        <div>
            <div>
                <form onSubmit={(e)=>addBlog(e)}>
                    <label>Title</label><br />
                    <input type='text' placeholder="enter title" className="inpt" onChange={(e)=>{setNewb({...newb, title: e.target.value})}} /><br />
                    <label>Description</label><br />
                    <textarea type='text' placeholder="Write your blog" className="texta" onChange={(e)=>{setNewb({...newb, description: e.target.value})} }/><br />
                    <button className="btn btn-primary" type="submit">Add Blog</button>

                </form>
            </div>
        </div>
    )
}

export default Add
