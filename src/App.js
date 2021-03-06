import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.less';
import Header from './Header';
import List from './List';

function App(props) {
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    axios.get('api/word_list/').then((res) => {
      setWords(res.data.words);
    });
  }, []);

  const updateAndSelectWord = (newWord) => {
    setWords([].concat(words, [newWord]));
    setSelectedWord(newWord);
  }

  return (
    <div className="app">
      <Header
        filter={filter}
        setFilter={setFilter}
        updateAndSelectWord={updateAndSelectWord}
        selectedWord={selectedWord}
        setSelectedWord={setSelectedWord}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        setWords={setWords}
      />
      <List
        selectedWord={selectedWord}
        setSelectedWord={setSelectedWord}
        words={words}
        setLoading={setLoading}
        setError={setError}
      />
    </div>
  );
}

export default App;
