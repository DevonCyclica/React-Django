import React, { useState } from 'react';
import axios from 'axios';

import "./List.less";

function List(props) {
  const convertToRealWord = (word) => {
    props.setLoading(true);
    axios.post('api/convert_word/', {word: word.id}).then((res) => {
      props.setLoading(false);
      props.updateAndSelectWord(res.data.word);
    }).catch((error) => {
      props.setLoading(false);
    });
  };

  const setSelectedSimilar = (word) => {
    const filteredWord = props.words.filter((allWord) => allWord.id === word.id);
    if (filteredWord.length > 0) {
      props.setSelectedWord(word);
    } else {
      convertToRealWord(word);
    }
  }

  return (
    <div className="list">
      <div>
        <div>
          <p>Words</p>
        </div>
        <div>
          <p>Synonyms</p>
        </div>
        <div>
          <p>Antonyms</p>
        </div>
        <div>
          <p>Part of speech</p>
        </div>
      </div>
      <div>
        <div>
          {props.words.filter(
            (word) => word.word.includes(props.filter)
          ).filter(
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
