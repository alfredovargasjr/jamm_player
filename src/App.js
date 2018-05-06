import React from 'react';

import NavBar from "./navigation/NavBar";
import Routes from "./navigation/Routes";

const height = (windowheight) => (windowheight - 50) + 'px';

const App = () => (
  <div style={{ marginTop: "50px", backgroundColor: "#ecebe8", height: window.innerHeight }}>
    <NavBar />
    <div style={{ marginTop: "50px", backgroundColor: "#ecebe8", height: window.innerHeight }} id="routeContainer">
      <Routes />
    </div>
  </div>
);

export default App;
