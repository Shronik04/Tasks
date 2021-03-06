import React,{useState,useEffect} from 'react'
import axios from 'axios'
function Home() {

    const [blogs, setBlogs] = useState();
    const [page, setPage] = useState(1);
    const [len, setLen] = useState();
    const limit = 6;
    const [edit, setEdit] = useState(false)
    const [idx,setIdx]=useState('')
    useEffect(() => {


        axios.get(`http://localhost:5000/blogs?page=${page}&limit=${limit}`)
            .then((res) => {
                console.log(res.data);
                setBlogs(res.data.result)
         setLen(res.data.total)
                console.log("data lentghhhhh", len);
            })
            .catch((err) => {
            console.log(err);
        })
    }, [page])
    
    const updateBlog = (e,index) => {
        e.preventDefault();

        const cardId= blogs[index]._id
        blogs && axios.put(`http://localhost:5000/update/${cardId}`, blogs[index])
            .then((res) => {
                console.log("updated");
               
                setEdit(false)
            }).catch(err =>
            alert(err.response.data))
        
    }

    const editTitle = (e, index) => {
        var data = [...blogs];
        console.log(data[index].title);
        setBlogs(data,(data[index].title =e.target.value))
    }
    const editDesc = (e, index) => {
        var data = [...blogs];
        setBlogs(data,(data[index].description=e.target.value))
    }

    function pageNext() {
        setPage(page+1)
    }

    function previous() {
        setPage(page-1)
    }

    function sho() {
        console.log(blogs);
    }
    function showForm(e,index) {
        setEdit(true);
        setIdx(index)
}
    return (
        <div className="container"> 
            <div className="row">
                {blogs&& blogs.map((i, index) => (
                  
                <div className="card p-4 col-md-4 m-2" >

                   { edit?null:<div className="card-body" key={index} >
                        
                        <div><b>Title:</b> {i.title}</div><br /><hr/>
                        <div>
                            <b>Description:</b> {i.description}
                        </div>
                       
                        <button className="m-2 btn btn-secondary" onClick={(e) => {showForm(e,index) }}>Edit</button>
                   
                    </div>}
                    {edit && idx == index ? <form onSubmit={(e)=>updateBlog(e,index)}>
                            <label>Title:</label><br /><input type="text" value={i.title} onChange={(e) => { editTitle(e, index) }} /> <br />
                <label>Description:</label><br /><textarea type="text" value={i.description} onChange={(e)=>{editDesc(e,index)}} /><br />
                            <button type="submit" className="btn btn-primary m-1">Done</button>
                            <button className="btn btn-danger m-1" onClick={() => setEdit(false)}>Cancel</button>         
                                    
                            
            </form>:null} 
                </div>
                    
                ))}
                
 
            </div>
        
            {page > 1 ? <button  className="m-2 btn btn-warning" onClick={previous}>Prev</button> : null}
           
           
            {len < limit ? null : <button onClick={pageNext} className="m-2 btn btn-success">Next</button> } 
           
            <h5>Page {page}</h5>
            
        </div>
    )
}

export default Home
