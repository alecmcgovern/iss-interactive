import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import './graph1.scss';

function Graph1(props) {
	const d3Container = useRef(null);

	useEffect(() => {
		if (props.data && d3Container.current) {
			const svg = d3.select(d3Container.current);

			const update = svg
				.append('g')
				.selectAll('text')
				.data(props.data);

			update.enter()
				.append('text')
				.attr('x', (d, i) => i * 25)
				.attr('y', 40)
				.style('font-size', 24)
				.text(d => d);

			update
				.attr('x', (d, i) => i * 40)
				.text(d => d);

			update.exit()
				.remove();
		}
	}, [props.data, d3Container.current]);

	return (
		<div className="graph1">
			<svg className="d3-component" width={250} height={180} ref={d3Container} />
		</div>
	);
}

export default Graph1;
