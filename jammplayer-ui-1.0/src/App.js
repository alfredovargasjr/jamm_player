import React from 'react';

import NavBar from "./navigation/NavBar";
import Routes from "./navigation/Routes";
const height = (windowheight) => (windowheight - 50) + 'px';



/**
 * App component
 *  - main component that mounts:
 *    - navagation bar
 *    - route component
 */
class App extends React.Component{

    constructor() {
        super();
        this.state = {
            start: true
        };
    }

    componentDidMount() {
        this.render();
    }

    startTime = () => {
        if(!this.state.start) {
            fetch('http://localhost:3001/start', {
                method: 'POST',
                body: JSON.stringify({message: "Start"})
            }).then(
                console.log("works")
            );
            this.setState({start: true});
        }
    };

    setStart = (event) => {
        if(event.key === 'Enter' && event.shiftKey) {
            console.log("Ready to record");
            this.setState({start: false});
        }
    }


    render() {
        return(
            <div onClick={this.startTime.bind(this)} onKeyPress={this.setStart} tabIndex="0">
                <div style={{marginTop: "50px", backgroundColor: "#ecebe8", height: window.innerHeight}}>
                    <NavBar/>
                    <div style={{marginTop: "50px", backgroundColor: "#ecebe8", height: window.innerHeight}}
                         id="routeContainer">
                        <Routes/>
                    </div>
                </div>
            </div>
        )
    }
};

export default App;