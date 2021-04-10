import axios from 'axios';
import React,{useEffect,useState} from 'react'
import cookie from 'react-cookies'
import { toast } from "react-toastify";
function Dashboard() {

    const [blg, setBlg] = useState();
    const [tok, setTok] = useState('');
    const[up,setUp]=useState()
    const [uId, setUId] = useState();
    const [page, setPage] = useState(1);
    const limit = 6;
    const [len, setLen] = useState();

    // const [demo, setDemo]=useState(false)
 const [im, setIm] = useState();
    const [newBlog, setNewBlog] = useState({
        title: "",
        description: "",
      
    })
   

    useEffect(() => {
        console.log("image check",im);
})
    useEffect(() => {
        const token = cookie.load("jwt")
  
        setTok(token)
        tok && axios.get(`http://localhost:5000/blogs?page=${page}&limit=${limit}`, tok && {
            headers: {
                "jwt":tok
            }
        })
            .then((res) => {
                console.log(res.data.result);
                setBlg(res.data.result)
         setLen(res.data.total)
                
            })
            .catch((err) => {
                console.log(err);
            })
    }, [tok, page])
  
  
    
    const addBlog = (e) => {
       
        e.preventDefault();
        
         newBlog &&
        axios.post(`http://localhost:5000/addblog`, newBlog,tok && {
            headers: {
                "jwt": tok,
                'content-type':'multipart/form-data'
            }
        })  
        
           .then((res) => {
                console.log(res.data)
              alert("Blog added")
            //    toast.error("Blog added")
            setNewBlog({
                title: "",
                description: "",
            
            })
       
              
            })
           .catch((err) => {
   
                console.log(err.response);
        })
    }


 
    function pageNext() {
        setPage(page+1)
    }

    function previous() {
        setPage(page-1)
    }
    
    const handleFile= (file)=> {
        const formdata = new FormData();
        formdata.append("file", file);

        console.log("This is formData",formdata);
        setIm(formdata)
        
        // setNewBlog({...newBlog,file:formdata})
    }

    return (
        <div>
              
           
           
         
              {page > 1 ? <button className="m-2 btn btn-warning but2" onClick={previous}>Prev</button> : null}
                {len < limit ? null : <button onClick={pageNext} className="m-2 btn btn-success but">Next</button> } 
           
            <div className="row">
            <div className="dash-blogs col-md-8">
                <div className="row">
                {blg && blg.map((i, index) => (
                
                        <div className="card p-4 col-md-4 m-2">
                            <div className="card-body" key={index} >
                        
                        <div><b>Title:</b> {i.title}</div><br /><hr/>
                        <div>
                            <b>Description:</b> {i.description}
                        </div><hr />
                        <div>
                            <b>Author:</b> {i.author ? i.author.name : "N/A"}
                        </div>
                       
                      
                        </div>
                      
                    </div> 

                
                       
                ))}
                    </div>
                    {page > 1 ? <button className="m-2 btn btn-warning but2" onClick={previous}>Prev</button> : null}
                {len < limit ? null : <button onClick={pageNext} className="m-2 btn btn-success but">Next</button> } 
                <h5>Page {page}</h5>
                    

                </div>
                
            <div className="vl "></div>
            <div className="dash-form col">
                <form className="dform" onSubmit={(e)=>addBlog(e)} >
                    <legend>Add Blog</legend><hr />
                    <label>Title</label><br />
                    <input type='text' className="dinp" placeholder="Blog's title" onChange={(e) => setNewBlog({...newBlog, title:e.target.value}) }/><br /><br />
                        <label>Description</label><br />
                        <textarea type='text' className="dtext" placeholder="Description" onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })} /><br />
                        <input type="file" name="file" onChange={ (e)=>handleFile(e.target.files[0])}/><br /><br />
                        
                    <button type="submit" className="btn btn-primary" >submit</button>

                </form>
                </div>
               
            </div>    
          
        </div>
    )
}

export default Dashboard
