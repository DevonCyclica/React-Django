import React, { useState, useEffect } from 'react';

import "./Filter.less";

function Filter(props) {
  return (
    <div className="filter">
      <input type="text" value={props.filter} onChange={(event) => props.setFilter(event.target.value.toUpperCase())}/>
    </div>
  );
}

export default Filter;
