import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./Header.less";

function Header(props) {
  const addNewWord = () => {
    props.setLoading(true);
    props.setError(null);
    axios.post('api/add_new_word/', {newWord: props.filter}).then((res) => {
      props.updateAndSelectWord(res.data.word);
      props.setLoading(false);
    }).catch((error) => {
      props.setError(error.response.data);
      props.setLoading(false);
    });
  }

  const clearAllWords = () => {
    axios.post('api/clear_all_words/', {}).then((res) => {
      props.setWords(res.data.words);
      props.setSelectedWord(null);
    });
  }

  return (
    <div className="header">
      <div>
        {props.loading ? <p className="loading">loading...</p> : ''}
        {props.error ? <p className="error">Error: {props.error}</p> : ''}
      </div>
      <div>
        <input type="text" value={props.filter} onChange={(event) => props.setFilter(event.target.value)}/>
        <button type="button" onClick={() => addNewWord()}>Add new word</button>
      </div>
      <div>
        Currently selected word: {props.selectedWord ? props.selectedWord.word : 'None'}
      </div>
      <div>
        <button type="button" onClick={() => clearAllWords()}>Clear all words</button>
      </div>
    </div>
  );
}

export default Header;
