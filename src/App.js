
import './App.css';
import React from 'react';
import SiteBar from './components/SiteBar/SiteBar';
import Home from './components/Home/Home';
function App() {

  return (
    <div className="App">
        <SiteBar/>
        <Home/>
    </div>
  );
}

export default App;