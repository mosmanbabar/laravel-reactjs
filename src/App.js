import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import FeedBack from './components/feedback';
import AllFeedbacks from './components/feedback/allFeedbacks';
function App() {
  return (
    <div className='bg'>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/all-feedback" element={<AllFeedbacks/>} />
          <Route path="/feedback" element={<FeedBack/>} />
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
