import './App.css';
import React from 'react';
import { Auth } from 'firebase/auth';
import Routes from "./components/Routes"

function App() {
  return (
    <div>
      <header>
        <Routes />
      </header>
    </div>
  );
}

export default App;
