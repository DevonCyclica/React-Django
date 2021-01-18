import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./TestComponent.less";

function TestComponent(props) {
  const [whatever, setWhatever] = useState(null);

  useEffect(() =>{
    axios.get('api/foo_list/').then((res) => {

    })
  }, []);

  return (
    <div className="test-component">
      blah
    </div>
  );
}

export default TestComponent;
