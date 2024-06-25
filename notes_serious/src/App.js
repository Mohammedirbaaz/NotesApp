import React from 'react';
import Login from './components/js/login'
import Home from './components/js/home'
import Register from './components/js/register'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
                  <Route exact path='/login' element={< Login />}></Route>
                  <Route exact path='/home' element={< Home />}></Route>
                  <Route exact path='/register' element={< Register />}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
