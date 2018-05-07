import React from "react";
import
{   
    Jumbotron,
    Grid,
    Row,
    Col,
    Panel
} from "react-bootstrap";

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

class SessionBanner extends React.Component
{
    constructor(props){
        super(props);
    }


    render()
    {
        const {sessionInfo} = this.props;
        return (
            <div>
                <Jumbotron style={styles.JammJumbo}>
                    <Grid style={{marginLeft:'0px'}}>
                        <Row>
                            <Col lg={5}>
                                <h1 style={{ textAlign: "left", fontSize: "60px", color:"#1db954" }}> <b>{sessionInfo.name}</b></h1>
                                <p style={{textAlign: "left", fontSize: "30px", color: "white" }}>
                                    {sessionInfo.description}
                                </p>
                                <p style={{textAlign: "left", fontSize: "20px", color: "white" }}>
                                    Code: <b>{sessionInfo.id}</b>
                                </p>
                                <p style={{textAlign: "left", fontSize: "15px", color: "white" }}>
                                    Created by <b>{sessionInfo.owner.id}</b>
                                </p>
                            </Col>
                            <Col lg={7}>
                                <Panel>
                                    <Panel.Heading>
                                    <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>Panel content</Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
            </div>
        );
        
    }
    
}

export default SessionBanner;