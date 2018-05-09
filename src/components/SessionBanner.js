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
        const { sessionInfo, viewPlayer } = this.props;
        console.log("INSIDE SESSIOBABBER", viewPlayer);
        // this.state.playerURL = `https://open.spotify.com/embed?uri=spotify:user:${sessionInfo.owner.id}:playlist:${sessionInfo.id}&view=coverart`;
        // if (this.state.updatePlayer)
        // {
        //     console.log(document.getElementById('player').src);
        //     document.getElementById('player').src = document.getElementById('player').src;
        // }
        if (!viewPlayer)
            {
                return (
                    <div>
                    <Jumbotron style={styles.JammJumbo}>
                        <Grid >
                            <Row>
                                <Col lg={12} sm={12}>
                                    <h1 style={{ textAlign: "left", fontSize: "60px", color: "#1db954" }}> <b>{sessionInfo.name}</b></h1>
                                    <p style={{ textAlign: "left", fontSize: "30px", color: "white" }}>
                                        {sessionInfo.description}
                                    </p>
                                    <p style={{ textAlign: "left", fontSize: "20px", color: "white" }}>
                                        Code: <b>{sessionInfo.id}</b>
                                    </p>
                                    <p style={{ textAlign: "left", fontSize: "15px", color: "white" }}>
                                        Created by <b>{sessionInfo.owner.id}</b>
                                    </p>
                                </Col>
                            </Row>
                        </Grid>
                    </Jumbotron>
                    </div>
                    );
            }else
        {
            this.state.playerURL = `https://open.spotify.com/embed?uri=spotify:user:${sessionInfo.owner.id}:playlist:${sessionInfo.id}&view=coverart`;
            // this.state.playerURL = `https://open.spotify.com/embed?uri=spotify:user:alfredovargas:playlist:2i9fQiK8AxFGLpk1NoznAO&view=coverart`;
            console.log(this.state.playerURL);
            if (this.state.updatePlayer)
            {
                console.log(document.getElementById('player').src);
                document.getElementById('player').src = document.getElementById('player').src;
            }
            this.state.updatePlayer = true;
                return (
                <div>
                    <Jumbotron style={styles.JammJumbo}>
                        <Grid >
                            <Row>
                                <Col lg={6} sm={6}>
                                    <h1 style={{ textAlign: "left", fontSize: "60px", color: "#1db954" }}> <b>{sessionInfo.name}</b></h1>
                                    <p style={{ textAlign: "left", fontSize: "30px", color: "white" }}>
                                        {sessionInfo.description}
                                    </p>
                                    <p style={{ textAlign: "left", fontSize: "20px", color: "white" }}>
                                        Code: <b>{sessionInfo.id}</b>
                                    </p>
                                    <p style={{ textAlign: "left", fontSize: "15px", color: "white" }}>
                                        Created by <b>{sessionInfo.owner.id}</b>
                                    </p>
                                </Col>
                                <Col lg={6} sm={6} style={{ alignContent: 'center', height: 'auto', position: 'relative' }}>
                                    <Col lg={4} />
                                    <Col lg={4}>
                                        <div class='embed-container' style={{ alignContent: 'center', position: 'responsive' }}>
                                            <iframe id='player' src={this.state.playerURL} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                            {/* <iframe id="player" src={this.state.playerURL} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
                                        </div>
                                    </Col>
                                    <Col lg={4} />
                                    {/* <Panel>
                                    <Panel.Heading>
                                    <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <iframe id="player" src={this.state.playerURL} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                    </Panel.Body>
                                </Panel> */}
                                </Col>
                            </Row>
                        </Grid>
                    </Jumbotron>
                </div>
                );
            
        }
        
    }
    
}

export default SessionBanner;