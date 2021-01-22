import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./List.less";

function List(props) {
  const [foos, setFoos] = useState(null);
  const [selectedFoo, setSelectedFoo] = useState(null);
  const [similarBars, setSimilarBars] = useState([]);

  useEffect(() =>{
    axios.get('api/foo_list/').then((res) => {
      setFoos(res.data);
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
        <div>
          <p>All Foos</p>
        </div>
        <div>
          <p>Related Bars</p>
        </div>
        <div>
          <p>Similar Bars</p>
        </div>
      </div>
      <div>
        <div>
          {foos.map((foo) => (
            <p className="clickable" onClick={() => setSelectedFoo(foo.name)}>{foo.name}</p>
          ))}
        </div>
        <div>
          {selectedFoo && selectedFoo.bars.map((bar) => (
            <p className="clickable" onClick={() => getSimilarBars(bar.id)}>{bar.name}-{bar.foo__name}</p>
          ))}
        </div>
        <div>
          {similarBars.map((bar) => (
            <p>{bar.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
