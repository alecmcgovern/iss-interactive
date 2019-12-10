import React, { useState } from 'react';
import * as socketApi from '../sockets/api';

import Scene from './scene';
import Controls from './Controls/controls';

import './main.scss';

function Main() {
	const [ clients, setClients ] = useState({});
	const [ rotation, setRotation ] = useState({ x: 90, y: 0, z: 0 });
	const [ inControl, setIncontrol ] = useState(false);
	const [ gameStarted, setGameStarted ] = useState(false); 

	socketApi.subscribeToClientConnection((err, clientId) => {
      // let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      // if (iOS) {
      //   console.log("IOS user connected");
      //   socketApi.sendDeviceType("iOS");
      // } else {
      //   let userAgent = navigator.userAgent || navigator.vendor;

      //   if (/android/i.test(userAgent)) {
      //     console.log("Android user connected");
      //       socketApi.sendDeviceType("Android");
      //   }
      // }

      console.log(clientId + " has connected");
    });

    socketApi.subscribeToClientDisconnection((err, clientId) => {
      console.log(clientId + " has disconnected");
    });

    // socketApi.subscribeToActiveClientList((err, clientList) => {
    //   console.log(clientList);
    //   setClients(clientList);

    //   if (!clientList.controller) {
    //     setGameStarted(false);
    //   }
    // });

    // socketApi.subscribeToControllingUserResponse((err, response) => {
    //   if (!inControl) {
    //   	setIncontrol(!!response);
    //   }
    // });

	return (
		<div className="main">
			<Scene rotation={rotation} />
		</div>
	);
}

export default Main;
