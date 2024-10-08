import React from 'react';
import logo from './logo.svg';
import './App.css';

// import Demo from './html-to-canvas/Demo'
// import Demo from './image-stack/Demo';
import ImageCanvasDemo from './image-stack/ImageCanvasDemo';
import ImageTextEditor from './image-text/ImageTextEditor';
import TextCanvas from './text-manipulation/TextCanvas';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        {/* <ImageCanvasDemo/> */}
        <TextCanvas/>


        {/* <Demo/> */}
        {/* <ImageTextEditor/> */}
    </div>
  );
}

export default App;
