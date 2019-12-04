import React from 'react';
import sceneConfig from './components/sceneConfig';
import Scene from './components/Scene';
import Menu from './components/Menu';
import './App.css';

function App() {	
	return (
		<div className="App">
			<Scene config={sceneConfig}/>
			{/*<Menu />*/}
		</div>
	);
}

export default App;
