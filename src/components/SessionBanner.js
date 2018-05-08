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
        this.state = {
            updatePlayer: false,
            playerURL: ''
        }
    }


    render()
    {
        const { sessionInfo } = this.props;
        this.state.playerURL = `https://open.spotify.com/embed?uri=spotify:user:${sessionInfo.owner.id}:playlist:${sessionInfo.id}&view=coverart`;
        if (this.state.updatePlayer)
        {
            console.log(document.getElementById('player').src);
            document.getElementById('player').src = document.getElementById('player').src;
        }
        this.state.updatePlayer = true;
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
                                    <Panel.Body>
                                        <iframe id="player" src={this.state.playerURL} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                    </Panel.Body>
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