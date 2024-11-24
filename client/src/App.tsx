import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';
import NavBar from './components/NavBar';
import Feed from './components/Feed';


function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/feed" element={<Feed />} /> 
        {/* <Route path="/login" element={<Login />} />  */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
