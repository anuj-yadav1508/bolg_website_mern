import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import SinglePost from './pages/singlePost/SinglePost'
import { useGlobalContext } from './context/AuthContext';
import WritePost from './pages/writePost/WritePost';
import EditProfile from './pages/editProfile/EditProfile';


function App() {
  const { user } = useGlobalContext()
  return (
    <Router>
    
      <Switch>
      <Route path='/login' >
        {user ? <Redirect to='/' /> : <Login />}
      </Route>

      <Route path='/register'>
        {user ? <Redirect to='/' /> : <Register />}
      </Route>

      <Route path='/profile/:userid'>
        <Profile />
      </Route>

      <Route path='/singlepost/:postid'>
        <SinglePost />
      </Route>    

      <Route path='/writepost'>
        <WritePost />
      </Route>

      <Route path='/editprofile'>
        <EditProfile />
      </Route>

      <Route path='/'>
        {user ? <Home /> : <Redirect to='/login' />}
      </Route>

      </Switch>
    
    </Router>
  );
}


export default App;
