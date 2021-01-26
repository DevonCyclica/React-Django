import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./Header.less";

function Header(props) {
  const addNewWord = () => {
    props.setLoading(true);
    axios.post('api/add_new_word/', {newWord: props.filter}).then((res) => {
      props.updateAndSelectWord(res.data.word);
      props.setLoading(false);
    }).catch((error) => {
      console.log(error);
      props.setLoading(false);
    });
  }
  return (
    <div className="header">
      <div>
        {props.loading ? 'loading...' : ''}
      </div>
      <div>
        <input type="text" value={props.filter} onChange={(event) => props.setFilter(event.target.value.toLowerCase())}/>
        <button type="button" onClick={() => addNewWord()}>Add new word</button>
      </div>
      <div>
        Currently selected word: {props.selectedWord ? props.selectedWord.word : 'None'}
      </div>
      <div>
        Currently selected part of speech: {props.selectedPartOfSpeech ? props.selectedPartOfSpeech : 'None'}
        {props.selectedPartOfSpeech && <button type="button" onClick={() => props.setSelectedPartOfSpeech(null)}>Clear selected part of speech</button>}
      </div>
    </div>
  );
}

export default Header;
