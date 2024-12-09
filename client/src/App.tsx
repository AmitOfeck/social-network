import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes , useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Feed from './components/Feed';
import PersonalPortal from './components/PersonalPortal';
import AllComments from './components/AllComments';
import EditPost from './components/EditPost';
import EditUser from './components/EditUser';
import { PostProvider } from './components/contexts/PostContext';
import { UserProvider } from './components/contexts/UserContext';


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
    <UserProvider>
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/register' && <NavBar />}
      <Routes>
        <Route path="/feed" element={<Feed />} /> 
        <Route path="/profile/:id" element={<PostProvider><PersonalPortal /></PostProvider>} />
        <Route path="/comments/:postId" element={<PostProvider><AllComments /></PostProvider>} />
        <Route path="/editPost/:postId" element={<PostProvider> <EditPost /> </PostProvider>} /> 
        <Route path="/editUser/:userId" element={<EditUser/>} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    </UserProvider>
  );
}

export default App;
