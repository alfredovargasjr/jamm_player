import React from "react";
import ReactDOM from "react-dom";
import
{
    BrowserRouter
} from "react-router-dom";
import App from "./App";
// import BodyBackgroundColor from "react-body-backgroundcolor";

/**
 * The main component that drives the app
 */
ReactDOM.render(
    // <BodyBackgroundColor backgroundColor="#ecebe8">
        <BrowserRouter style={{ backgroundColor: "#ecebe8", height: window.innerHeight }}>
            <App />
        </BrowserRouter>,
    //  </BodyBackgroundColor>,

    document.getElementById("root"),
);
