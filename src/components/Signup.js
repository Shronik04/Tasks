import React,{useState} from 'react'
import axios from 'axios'
function Signup() {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    
const [flag,setFlag]=useState(false)
    function signupform (e) {
        e.preventDefault();

        axios.post(`http://localhost:4000/user/signup`, data)
            .then((res) => {
                console.log(res);
                setFlag(!flag)
            }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <div>
      <form onSubmit={(e)=>signupform(e)} className="form">
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          required
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="text"
          name="password"
          id="password"
          required
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <br />
        <button type="submit" className="btn btn-secondary m-2">submit</button>
      </form>
      {flag ?(<Redirect to="/login" />): null}
    </div>
    )
}

export default Signup
