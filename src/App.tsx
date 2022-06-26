import React from 'react';
import { VariableSizeList as List } from './VariableSizeList';
import './App.css';

function App() {
  const data = new Array(10000).fill(undefined).map((value, id) => (({
    id: id,
    title: 'Can\'t import NPM Package',
    body: 'I\'m importing this in another file without any issues, but the moment Faker is attempted to be imported I receive this error.'
  })))

  interface RowProps {
    index: number,
    style?: object
  }

  const Row = ({index, style}: RowProps) => (
    <div style={style} className="post">
      <h3>{`${data[index].title}-${data[index].id}`}</h3>
      <p>{data[index].body}</p>
    </div>
  )

  const getItemSize = (index: number) => 100 * (index % 10 + 1);

  return (
    <List
      width={1400}
      height={800}
      itemCount={data.length}
      getItemSize={getItemSize}
    >
      {Row}
    </List>
  );
}

export default App;

/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
*/
