import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestComponent(props) {
  const [whatever, setWhatever] = useState(null);

  useEffect(() =>{
    axios.get('api/foo_list/').then((res) => {

    })
  }, []);

  return (
    <div>
      blah
    </div>
  );
}

export default TestComponent;
