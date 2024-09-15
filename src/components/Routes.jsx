import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Wall from "./Wall";
import Register from "./Register"

const router = () => {

    return (
      <Router>
  
          <Routes>
  
            <Route path='/' element={<Login />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/Wall' element={<Wall />}/>
  
          </Routes>
      </Router>
    );
  }

  
  export default router;