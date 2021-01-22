import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./List.less";

function List(props) {
  const [foos, setFoos] = useState(null);
  const [selectedFoo, setSelectedFoo] = useState(null);
  const [similarBars, setSimilarBars] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null);

  useEffect(() =>{
    axios.get('api/foo_list/').then((res) => {
      setFoos(res.data);
    });
  }, []);

  const getSimilarBars = (barId, barName) => {
    axios.get(`api/similar_bars/?barName=${barId}&reversed=${selectedBar.id === barId ? 1 : 0}`).then((res) => {
      setSimilarBars(res.data.bars);
    });
    setSelectedBar(bar);
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
            <p className="clickable" onClick={() => getSimilarBars(bar.name, bar.id)}>{bar.name}-{bar.foo__name}</p>
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
