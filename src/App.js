import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link,useHistory , Redirect} from "react-router-dom";
import Error from "./components/Error";
import Add from "./components/Add";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import UserBlogs from "./components/UserBlogs";
import {useState,useEffect} from 'react'
import Signup from "./components/Signup";
import cookie from 'react-cookies'
function App() {

  const [logi, setLogi] = useState(false)
  const [out, setOut] = useState(false);
  const [check, setCheck] = useState(false)
  const [cook, setCook] = useState();

  
 

  useEffect(() => {
    setCook(document.cookie)
    if(document.cookie) setCheck(true)
   },[check,cook])
  

  let history = useHistory()
  
  function logout() {
    cookie.remove("jwt")
    setCook('')
    setOut(false)
history.push('/')
    
  }
  
	return (
		<div className="App">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link to="/">HOME</Link>
					<div className="navbar-nav ml-auto">
            {check ? <><button onClick={(e)=>logout(e)}>Logout</button>
              <Link to="/dashboard">
                <button>Dashboard</button>
              </Link>
              <Link to="/dashboard/myblogs">
                <button>My Blogs</button>
              </Link></> : (<>

                <Link to="/login">
                  <button>login</button>
                </Link>
                <Link to="/signup">
                  <button>SignUp</button>
                </Link>
              </>)}
					</div>
				</div>
			</nav>
			<Switch>
				<Route exact path="/" ><Home logi={logi} setLogi={setLogi}/></Route>
        <Route exact path="/add" component={Add} />
				<Route exact path="/signup" component={Signup} />
        
				<Route exact path="/dashboard/myblogs" component={UserBlogs} />

				<Route exact path="/login" ><Login check={check} setCheck={setCheck} /></Route>

				<Route exact path="/dashboard" component={Dashboard} />

				<Route exact path="*" component={Error} />
      </Switch>
		</div>
	);
}

export default App;
