import React, { useEffect, useState } from 'react';

import './controller.scss';

function Controller() {
	const [ isMobile, setIsMobile ] = useState(false);
	const [ rotation, setRotation ] = useState({ x: 0, y: 0, z: 0 });
	const [ permission, setPermission ] = useState(false);

	useEffect(() => {
		if (window.DeviceOrientationEvent && window.DeviceOrientationEvent.requestPermission) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}

		return () => {
			window.removeEventListener("deviceorientation", orientationChange);
		}
	}, []);

	function onClick() {
		window.DeviceOrientationEvent.requestPermission()
			.then(response => {
				if (response == 'granted') {
					setPermission(true);
					window.addEventListener("deviceorientation", orientationChange);
				} else {
					setPermission(false);
					console.log("permission has not been granted for orientation controls");
				}
			})
	}

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
			<div className="button" onClick={onClick}>Grant Permission</div>
			<div>{`Permission has ${permission ? "" : "NOT"} been granted`}</div>
			<div className="view">
				<div>{`x: ${rotation.x}`}</div>
				<div>{`y: ${rotation.y}`}</div>
				<div>{`z: ${rotation.z}`}</div>
			</div>
		</div>
	);
}

export default Controller;
