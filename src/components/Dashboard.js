import axios from 'axios';
import React,{useEffect,useState} from 'react'

function Dashboard() {

    const [blg, setBlg] = useState();
    useEffect(() => {
        axios.get(`http://localhost:5000/blogs?page=1&limit=6`)
            .then((res) => {
                console.log(res.data.result);
                setBlg(res.data.result)
            })
            .catch((err) => {
                console.log(err);
            })
})

    return (
        <div className="row">
            <div className="dash-blogs col-md-8">
                <div className="row">
                {blg && blg.map((i, index) => (
                   <div className="card p-4 col-md-3 m-2" >

                <div className="card-body" key={index} >
                        
                        <div><b>Title:</b> {i.title}</div><br /><hr/>
                        <div>
                            <b>Description:</b> {i.description}
                        </div>
                       
                      
                   
                    </div>
                        </div>
                ))}
                    </div>
            </div>
            <div className="vl "></div>
            <div className="dash-form col">
                <form className="dform">
                    <legend>Add Blog</legend><hr />
                    <label>Title</label><br />
                    <input type='text' className="dinp" placeholder="Blog's title" /><br /><br />
                    <label>Description</label><br />
                    <textarea type='text' className="dtext" placeholder="Description" /><br/>

                </form>
            </div>
        </div>
    )
}

export default Dashboard
