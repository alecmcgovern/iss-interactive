import React, { useEffect, useState, useRef } from 'react';
import _ from 'underscore';

import * as socketApi from '../sockets/api';

import './controller.scss';

function Controller() {
	const [ isMobile, setIsMobile ] = useState(false);
	const [ rotation, setRotation ] = useState({ x: 0, y: 0, z: 0 });
	const _rotation = useRef({ x: 0, y: 0, z: 0 });
	const [ permission, setPermission ] = useState(false);

	useEffect((orientationChange) => {
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
				if (response === 'granted') {
					setPermission(true);
					window.addEventListener("deviceorientation", orientationChange);
				} else {
					setPermission(false);
				}
			})
	}

	function orientationChange(event) {
		if (event.alpha && event.beta && event.gamma) {
			const newRotation = {
				x: Number(event.beta.toFixed(0)),
				y: Number(event.gamma.toFixed(0)),
				z: Number(event.alpha.toFixed(0))
			}

			if (!_.isEqual(newRotation, _rotation.current)) {
				setRotation(newRotation);
				socketApi.sendOrientation(newRotation);
				_rotation.current = newRotation;
			}
		}
	}

	return (
		<div className="controller">
			<h1>{isMobile ? "Mobile" : "Desktop" }</h1>
			{
				isMobile ?
					<div>
						<div className="button" onClick={onClick}>Grant Permission</div>
						<div>{`Permission has ${permission ? "" : "NOT"} been granted`}</div>
					</div>
					:
					<div>Your device does not have support for orientation controls</div>

			}
			<div className="view">
				<div>{`x: ${rotation.x}`}</div>
				<div>{`y: ${rotation.y}`}</div>
				<div>{`z: ${rotation.z}`}</div>
			</div>
		</div>
	);
}

export default Controller;
