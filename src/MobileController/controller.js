import React, { useEffect, useState } from 'react';

import './controller.scss';

function Controller() {
	const [ isMobile, setIsMobile ] = useState(false);
	const [ rotation, setRotation ] = useState({ x: 0, y: 0, z: 0 });

	useEffect(() => {
		if (window.DeviceOrientationEvent) {
			setIsMobile(true);
			window.addEventListener("deviceorientation", orientationChange);
		} else {
			setIsMobile(false);
		}

		return () => {
			window.removeEventListener("deviceorientation", orientationChange);
		}
	}, [])

	function orientationChange(event) {
		if (event.alpha && event.beta && event.gamma) {
			setRotation({ 
				x: event.beta.toFixed(0),
				y: event.gamma.toFixed(0),
				z: event.alpha.toFixed(0)
			});
		}
	}

	return (
		<div className="controller">
			<h1>{isMobile ? "Mobile" : "Desktop" }</h1>
			<div className="view">
				<div>{`x: ${rotation.x}`}</div>
				<div>{`y: ${rotation.y}`}</div>
				<div>{`z: ${rotation.z}`}</div>
			</div>
		</div>
	);
}

export default Controller;
