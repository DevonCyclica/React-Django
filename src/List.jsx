import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./List.less";

function List(props) {
  const [foos, setFoos] = useState([]);
  const [selectedFoo, setSelectedFoo] = useState(null);
  const [similarBars, setSimilarBars] = useState([]);
  const [selectedBarId, setSelectedBarId] = useState(null);

  useEffect(() =>{
    axios.get('api/foo_list/').then((res) => {
      setFoos(res.data.foos);
    });
  }, []);

  const getSimilarBars = (barName, barId) => {
    axios.get(`api/similar_bars/?barName=${barName}&reverse=${selectedBarId === barId ? 1 : 0}`).then((res) => {
      setSimilarBars(res.data.bars);
    });
    setSelectedBarId(barId);
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
          {foos.filter((foo) => foo.name.includes(props.filter)).map((foo) => (
            <p className="clickable" onClick={() => setSelectedFoo(foo)}>{foo.name}</p>
          ))}
        </div>
        <div>
          {selectedFoo && selectedFoo.bars.map((bar) => (
            <p className="clickable" onClick={() => getSimilarBars(bar.name, bar.id)}>{bar.name}-{bar.foo__name}</p>
          ))}
        </div>
        <div>
          {similarBars.map((bar) => (
            <p>{bar.name}-{bar.foo__name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
