import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Ships from './components/Ships';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <h3 className='m-3 d-flex justify-content-center'>
          Ship Operations Service
        </h3>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/ships' component={Ships} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
