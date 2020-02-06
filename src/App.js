import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import maskIcon from './mask64.png';
import './App.css';
import GoogleApiWrapper from './components/Map'

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">
          <div><img src={maskIcon} alt="mask-icon" /></div>
          <div>Face Mask Finder 找找口罩</div>
        </div>
      </header>
      <GoogleApiWrapper />
    </div>
  );
}

export default App;
