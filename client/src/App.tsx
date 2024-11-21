import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';


function App() {
  return (
    <div className="App">
      <h1>Welcome to the App</h1>
      {/* <Register /> */}
      {/* <Login /> */}
      <CreatePost />
    </div>
  );
}

export default App;
