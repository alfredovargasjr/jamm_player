import React from 'react';
import
{
    Grid,
    Col,
    Row,
    Thumbnail,
    ProgressBar,
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
        color: "#84bd00",
        position: "relative",
        width: "100%",
        marginBottom: "0px",
        padding: "20px"
    },
    centerWhiteBold: {
        color: "white", textAlign: "center", fontSize: "20px"
    },
};

const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

// home page component
class Home extends React.Component
{
    render()
    {
        return (
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
                                    <Panel.Heading style={{ backgroundImage: "none", backgroundColor: "#415500" }}>
                                        <Panel.Title style={styles.centerWhiteBold} toggle><b>Create a Session</b></Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>Create a Session
                                            <LinkContainer to="/CreateSession">
                                                <Button bsSize="large" block>
                                                    <h4>Create</h4>
                                                </Button>
                                            </LinkContainer>
                                        </Panel.Body>
                                    
                            </Panel>
                            <Panel eventKey="2">
                                    <Panel.Heading style={{ backgroundImage: "none", backgroundColor: "#7A9915" }}>
                                        <Panel.Title style={styles.centerWhiteBold} toggle><b>Join a Session</b></Panel.Title>
                                </Panel.Heading>
                                    <Panel.Body collapsible>Join a Session
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