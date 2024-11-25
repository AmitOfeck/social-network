import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes , useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Feed from './components/Feed';
import PersonalPortal from './components/PersonalPortal';
import AllComments from './components/AllComments';


function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation(); 

  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/register' && <NavBar />}
      <Routes>
        <Route path="/feed" element={<Feed />} /> 
        <Route path="/profile/:id" element={<PersonalPortal />} />
        <Route path="/comments/:postId" element={<AllComments />} />
        {/* <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  );
}

export default App;
