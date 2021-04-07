import './App.css';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch,Route } from "react-router-dom"
import Error from './components/Error'
import Add from './components/Add';
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">


      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/dashboard" component={Dashboard} />


        <Route exact path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
