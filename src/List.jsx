import React, { useState } from 'react';
import axios from 'axios';

import "./List.less";

function List(props) {
  return (
    <div className="list">
      <div>
        <div>
          <p>Words</p>
          <p className="sub-header">Select Word to update synonyms</p>
        </div>
        <div>
          <p>Synonyms</p>
          <p className="sub-header">List of synonyms for selected word</p>
        </div>
      </div>
      <div>
        <div>
          {props.words.map((word) => (
            <p
              className={`clickable ${props.selectedWord && props.selectedWord.word === word.word ? 'selected' : ''}`}
              onClick={() => props.setSelectedWord(word)}
            >
              {word.word}
            </p>
          ))}
        </div>
        <div>
          {props.selectedWord && props.selectedWord.synonyms.length > 0 ?
            props.selectedWord.synonyms.map((word) => (
              <p
                className="clickable"
                onClick={() => setSelectedSimilar(word)}
              >
                {word.word}
              </p>
            )) : <p>No synonyms found!</p>
          }
        </div>
      </div>
    </div>
  );
}

export default List;
