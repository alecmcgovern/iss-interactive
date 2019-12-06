import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/main';
import Controller from './MobileController/controller';

import './App.scss';

function App() {	
	return (
		<BrowserRouter>
			<Route path="/" exact render={(props) => {
				return <Main />
			}}/>
			<Route path="/controller" exact render={(props) => {
				return <Controller />
			}}/>
		</BrowserRouter>
	);
}

export default App;
