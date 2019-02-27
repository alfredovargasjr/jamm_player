import React from "react";
import { Navbar, NavItem, Nav} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

/**
 * the navigation bar for the app,
 *  - reroutes to home component on click
 */
const NavBar = () => (


    <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                <LinkContainer to="/">
                    <a onClick={logTime}>Jamm.</a>
                </LinkContainer>
            </Navbar.Brand>
        </Navbar.Header>
    </Navbar>

);

function logTime() {

    //fetch('/log');
    fetch('http://localhost:3001/home', {
        method: 'POST',
        body: JSON.stringify({message: "Jamm Home Button"})
    }).then(
        console.log("works")
    );
};

export default NavBar;
