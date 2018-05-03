import React from "react";
import { Navbar, NavItem, Nav} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

const NavBar = () => (

    <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                <LinkContainer to="/">
                    <a>Jamm.</a>
                </LinkContainer>
            </Navbar.Brand>
        </Navbar.Header>
    </Navbar>

);

export default NavBar;
