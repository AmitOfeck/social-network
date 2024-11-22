import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';


function App() {
  return (
    <div className="App">
      <h1>Welcome to the App</h1>
      {/* <Register /> */}
       {/* <Login />  */}
      <CreatePost />
      <Posts />
    </div>
  );
}

export default App;
