import React,{useState,useEffect} from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import Dashboard from './Dashboard'
import { Redirect } from 'react-router-dom'
function Login({check, setCheck}) {

    const [dataL, setDataL]=useState({email:"",
      password: ""
    })
  const [re,setRe]=useState(false)

  useEffect(() => {
    console.log("login data", dataL);
  })
  
    function submitForm(e) {
      e.preventDefault();
           axios
      .post("http://localhost:5000/user/login", dataL)
      .then(res => {
          setDataL({
            ...dataL,
            
            email: '',
            password1: '',
          
          })
          console.log("ressss",res.data)
        cookie.save("jwt", res.data.token)
        setRe(!re)
        setCheck(!check)
      })
             .catch((err) => {
          console.log(err.response);
      })
   
  }
  
  
  
  
    return (
        <div>
        <form onSubmit={submitForm}>
  
    <label>Email</label>
    <br />
    <input
      type="text"
      name="email"
      id="email"
      required
      onChange={(e) => {
        setDataL({ ...dataL, email: e.target.value });
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
        setDataL({ ...dataL, password: e.target.value });
      }}
    />
    <br />
   
    <button type="submit" className="btn btn-secondary m-2">submit</button>
    </form>
    {re?(<Redirect to="/dashboard" />):null}
    </div>
    )
}

export default Login
