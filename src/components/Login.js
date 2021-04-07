import React,{useState} from 'react'

function Login() {

    const [dataL, setDataL]=useState({email:"",
password:""}

   )
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
    <span>Forgot Password?<a onClick={forgot} href="">Reset Here</a></span><br />
    <button type="submit" className="btn btn-secondary m-2">submit</button>
    </form>
    {dash==1?(<Home />):null}
    </div>
    )
}

export default Login
