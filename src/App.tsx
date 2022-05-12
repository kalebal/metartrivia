import React from 'react';
import './App.css';
import { DragDropList } from './game/drag-drop-context';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <DragDropList />
      </header>
    </div>
  );
}

export default App;
