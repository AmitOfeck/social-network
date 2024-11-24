import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';
import NavBar from './components/NavBar'


function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <Register /> */}
       {/* <Login />  */}
      <CreatePost />
      <Posts />
    </div>
  );
}

export default App;
