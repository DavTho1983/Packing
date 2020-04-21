import React, { useRef } from 'react';
import './App.css';

import Boxes from './components/Boxes/Boxes'

function App() {
  const packingContainer = useRef()
  return (
    <div className="App">
      <header className="App-header">
        <h1>Packing algorithm</h1>
      </header>
      <div>
        <div ref={packingContainer} className="packingContainer"> 
          {<Boxes 
            containerInnerWidth={500}
            containerInnerHeight={500}
          />}
        </div>
      </div>
    </div>
  );
}

export default App;
