import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Scene from './components/scene';
import Controller from './MobileController/controller';

import './App.scss';

function App() {	
	return (
		<BrowserRouter>
			<Route path="/" exact render={(props) => {
				return <Scene />
			}}/>
			<Route path="/controller" exact render={(props) => {
				return <Controller />
			}}/>
		</BrowserRouter>
	);
}

export default App;
