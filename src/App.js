import './App.css';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch,Route } from "react-router-dom"
import Error from './components/Error'

function App() {
  return (
    <div className="App">


      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
