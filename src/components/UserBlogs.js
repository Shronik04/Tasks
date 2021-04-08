import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import cookie from 'react-cookies'
function UserBlogs() {
    const [tok, setTok] = useState('');
    const [ub, setUb] = useState();
     const [edit, setEdit] = useState(false)
    const [idx, setIdx] = useState('')
 

    useEffect(() => {
        const token = cookie.load("jwt")
        setTok(token)
        tok && axios.get(`http://localhost:5000/user/blogs`, tok && {
            headers: {
               "jwt":tok
           }
       })
            .then((res) => {
                console.log(res.data);
                setUb(res.data)
            })
            .catch((err) => {
            console.log(err);
        })
    }, [tok])
   

    const updateBlog = (e,index) => {
        e.preventDefault();

        const cardId= ub[index]._id
        ub && axios.put(`http://localhost:5000/update/${cardId}`, ub[index])
            .then((res) => {
                console.log("updated",res.data);
        alert(res.data)
                setEdit(false)
            }).catch(err =>
            alert(err.response.data))
        
    }


    const editTitle = (e, index) => {
        var data = [...ub];
        console.log(data[index].title);
        setUb(data,(data[index].title =e.target.value))
    }
    const editDesc = (e, index) => {
        var data = [...ub];
        setUb(data,(data[index].description=e.target.value))
    }
    function showForm(e,index) {
        setEdit(true);
        setIdx(index)
}
    return (
        <div>
            <h1 className="m-5">My Blogs</h1>
            <div className="row">
                
            {ub && ub.map((i, index) => (
                <div className="card p-4 col-md-4 m-2">
                <div className="card-body" key={index} >
            
            <div><b>Title:</b> {i.title}</div><br /><hr/>
            <div>
                <b>Description:</b> {i.description}
            </div><hr />
            <div>
                <b>Author:</b> {i.author ? i.author.name : "N/A"}
            </div>
            <button className="m-2 btn btn-secondary" onClick={(e) => {showForm(e,index) }}>Edit</button>
            
            {edit && idx == index ? <form onSubmit={(e)=>updateBlog(e,index)}>
                            <label>Title:</label><br /><input type="text" value={i.title} onChange={(e) => { editTitle(e, index) }} /> <br />
                <label>Description:</label><br /><textarea type="text" value={i.description} onChange={(e)=>{editDesc(e,index)}} /><br />
                            <button type="submit" className="btn btn-primary m-1">Done</button>
                            <button className="btn btn-danger m-1" onClick={() => setEdit(false)}>Cancel</button>         
                                    
                            
            </form>:null}
          
                    </div>
                    
                </div> 
                
            ))}
                
            </div>
        </div>
    )
}

export default UserBlogs
