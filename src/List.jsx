import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./List.less";

function List(props) {
  const [foos, setFoos] = useState([]);
  const [selectedFoo, setSelectedFoo] = useState(null);
  const [similarBars, setSimilarBars] = useState([]);

  useEffect(() =>{
    axios.get('api/foo_list/').then((res) => {
      console.log(res);
      setFoos(res.data.foos);
    });
  }, []);

  const getSimilarBars = (barName) => {
    axios.get(`api/similar_bars/?barName=${barName}`).then((res) => {
      setSimilarBars(res.data.bars);
    });
  };

  return (
    <div className="list">
      <div>
        {foos.filter((foo) => foo.name.includes(props.filter)).map((foo) => (
          <p className="clickable" onClick={() => setSelectedFoo(foo)}>{foo.name}</p>
        ))}
      </div>
      <div>
        {selectedFoo && selectedFoo.bars.map((bar) => (
          <p className="clickable" onClick={() => getSimilarBars(bar.name)}>{bar.name}</p>
        ))}
      </div>
      <div>
        {similarBars.map((bar) => (
          <p>{bar.name}</p>
        ))}
      </div>
    </div>
  );
}

export default List;
