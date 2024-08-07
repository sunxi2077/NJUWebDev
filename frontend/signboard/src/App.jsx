// import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/LogIn.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'

// function App() {
//   // const [count, setCount] = useState(0)
//   return (
//     <>
//       <div>
//         <a href="https://github.com" target="_blank">
//           <img src={task} className="logo" alt="Board logo" />
//         </a>
//       </div>
//       <h1>Welcome to Your Board</h1>
//       <div className="card">
//         <button >
//           Click to Log In
//         </button>
//       </div>
//       <p className="read-the-docs">
//         {/* 下方小字注释部分 */}
//       </p>
//     </>
//   )
// }

// export default App

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;



