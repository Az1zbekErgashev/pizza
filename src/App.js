
import './App.css';
import React from 'react';
import SiteBar from './components/SiteBar/SiteBar';
import Home from './components/Home/Home';
import { Outlet } from 'react-router-dom';
function App() {

  return (
    <div className="App">
        <SiteBar/>
        <Outlet/>
        <Home/>
    </div>
  );
}

export default App;