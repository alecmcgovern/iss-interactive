import React from 'react';
import Graph1 from './d3/graph1';

import './controls.scss';

function Controls() {
	const data = [1, 2, 3];
	
	return (
		<div className="controls">
			<Graph1 data={data}/>
		</div>
	);
}

export default Controls;
