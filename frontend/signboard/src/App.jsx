// import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/LogIn.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import TaskBoard from './components/TaskBoard.jsx' 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/taskboard" element={<TaskBoard />} />
      </Routes>
    </Router>
  );
};

export default App;



