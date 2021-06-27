// jshint esversion:6
import React from 'react';
// import Pi, {doublePi, triplePi} from './math';
import * as Pi from './math';

function List() {
	return (
		<ul>
      <li>{Pi.default}</li>
      <li>{Pi.doublePi()}</li>
      <li>{Pi.triplePi()}</li>
    </ul>
	);
}

export default List;