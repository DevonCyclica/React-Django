import React, { useState } from 'react';
import axios from 'axios';

import "./List.less";

function List(props) {
  const convertToRealWord = (word) => {
    props.setError(null);
    props.setLoading(true);
    axios.post('api/convert_word/', {word: word.id}).then((res) => {
      props.setLoading(false);
      props.updateAndSelectWord(res.data.word);
    }).catch((error) => {
      props.setError(error.response.data);
      props.setLoading(false);
    });
  };

  const setSelectedSimilar = (word) => {
    const filteredWord = props.words.filter((allWord) => allWord.id === word.id);
    if (filteredWord.length > 0) {  // word already exists as full word
      props.setSelectedWord(filteredWord[0]);
    } else {
      convertToRealWord(word);
    }
  }

  return (
    <div className="list">
      <div>
        <div>
          <p>Words</p>
          <p className="sub-header">Select Word to update other columns</p>
        </div>
        <div>
          <p>Synonyms</p>
          <p className="sub-header">Select Synonym to update selected word and potentially add to database</p>
        </div>
        <div>
          <p>Antonyms</p>
          <p className="sub-header">Select Antonym to update selected word and potentially add to database</p>
        </div>
        <div>
          <p>Part of speech</p>
          <p className="sub-header">Select Part of Speech to filter Word column</p>
        </div>
      </div>
      <div>
        <div>
          {props.words.filter( // filter by word filter
            (word) => word.word.includes(props.filter)
          ).filter( // filter by part of speech
            (word) => word.part_of_speech.filter(
              (partOfSpeech) => partOfSpeech.category === props.selectedPartOfSpeech || props.selectedPartOfSpeech === null
            ).length > 0
          ).map((word) => (
            <p
              className="clickable"
              onClick={() => props.setSelectedWord(word)}
            >
              {word.word}
            </p>
          ))}
        </div>
        <div>
          {props.selectedWord && props.selectedWord.synonyms.map((word) => (
            <p
              className="clickable"
              onClick={() => setSelectedSimilar(word)}
            >
              {word.word}
            </p>
          ))}
        </div>
        <div>
          {props.selectedWord && props.selectedWord.antonyms.map((word) => (
            <p
              className="clickable"
              onClick={() => setSelectedSimilar(word)}
            >
              {word.word}
            </p>
          ))}
        </div>
        <div>
          {props.selectedWord && props.selectedWord.part_of_speech.map((partOfSpeech) => (
            <p
              className="clickable"
              onClick={() => props.setSelectedPartOfSpeech(partOfSpeech.category)}
            >
              {partOfSpeech.category}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
