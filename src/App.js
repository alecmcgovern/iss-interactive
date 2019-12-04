import React from 'react';
import sceneConfig from './components/sceneConfig';
import Scene from './components/Scene';
import './App.css';

function App() {	
	return (
		<div className="App">
			<Scene config={sceneConfig}/>
		</div>
	);
}

export default App;
