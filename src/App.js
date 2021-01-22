import React, { useState } from 'react';
import reactLogo from './logo-react.svg';
import djangoLogo from './logo-django.svg';
import './App.css';

import Filter from './Filter';
import List from './List';

function App(props) {
  const [filter, setFilter] = useState('');
  return (
    <div className="App">
      <Filter filter={filter} setFilter={setFilter} />
      <List />
    </div>
  );
}

export default App;
