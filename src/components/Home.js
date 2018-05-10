import React from 'react';
import
{
    Grid,
    Col,
    Row,
    Button,
    Form,
    InputGroup,
    FormControl,
    Jumbotron,
    Panel,
    PanelGroup
} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";


// styles for the home page component
const styles = {
    JammJumbo: {
        backgroundColor: "rgb(45, 45, 45)",
        color: "#1db954",
        position: "relative",
        width: "100%",
        marginBottom: "0px",
        padding: "20px"
    },
    centerWhiteBold: {
        color: "white", textAlign: "center", fontSize: "20px"
    },
};


/**
 * styling for css
 */
const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
const panelDark = {
    backgroundImage: "none",
    backgroundColor: "#191414",
};

// home page component
class Home extends React.Component
{
    /**
     * Render method, part of the React frame work
     *  - return html to the index file using javascript
     *  - component gets rerendered whenever tis state changes
     */
    render()
    {
        /**
         * html to return from render call
         */
        return (
            /**
             * Home page of the app
             */
            <div style={{ backgroundColor: "#ecebe8", height: window.innerHeight,}}>
                <Jumbotron style={styles.JammJumbo}>
                        <h1 style={{textAlign: "center", fontSize:"70px"}}> <b>Jamm.</b></h1>
                        <p style={{textAlign: "center", fontSize:"13px", color:"white"}}>
                            A Collaborative Web Music Player powered by Spotify.
                        </p>
                </Jumbotron>
                <Grid> 
                    <Row>
                        <Col x={12} md={12}>
                            <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2"
                                style={{ paddingTop: "15px"}}>
                                <Panel eventKey="1">
                                    <Panel.Heading style={panelDark}>
                                        <Panel.Title style={styles.centerWhiteBold} toggle><h3><b>Create a Session</b></h3></Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                            <LinkContainer to="/CreateSession">
                                                <Button bsSize="large" block>
                                                    <h4>Create</h4>
                                                </Button>
                                            </LinkContainer>
                                        </Panel.Body>
                                    
                            </Panel>
                            <Panel eventKey="2">
                                    <Panel.Heading style={panelDark}>
                                        <Panel.Title style={styles.centerWhiteBold} toggle><h3><b>Join a Session</b></h3></Panel.Title>
                                </Panel.Heading>
                                    <Panel.Body collapsible>
                                            <LinkContainer to="/JoinSession">
                                        <Button bsSize="large" block>
                                                <h4>Join</h4>
                                        </Button>    
                                            </LinkContainer>
                                    </Panel.Body>
                            </Panel>
                            </PanelGroup>
                        </Col>
                    </Row>
                </Grid> 
            </div>
        );
    }
}

export default Home;