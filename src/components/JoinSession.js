import React from 'react';
import
{
    Jumbotron,
    Button,
    Grid,
    Panel,
    PanelGroup,
    Form,
    Row,
    Col,
    FormControl
} from "react-bootstrap";
import querystring from "querystring";
import Track from "./Track";
import Loading from "./Loading";
import SessionBanner from "./SessionBanner";

// Your client id
var client_id = 'f18adfa22eb64b1b9a74ce823ca80b3b';
// Your redirect uri
var redirect_uri = 'http://localhost:3000/JoinSession';
//scope for token
var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length)
{
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const displayTracks = (bool, tracks, handleTrackClick, clickable) =>
{
    console.log("does this appear in displayTracks?", handleTrackClick);
    let tracksDisplay = []
    if (bool === true)
    {

        for (var e in tracks)
        {
            tracksDisplay.push(
                // <div key={e} >
                <Track
                    onTrackClick={handleTrackClick}
                    trackInfo={tracks[e]}
                    clickable={clickable}
                />
                // </div>
            );
        }
    }
    return tracksDisplay;
};

const styles = {
    panelDark: {
        backgroundImage: "none",
        backgroundColor: "#191414",

    },
    centerWhiteBold: {
        color: "white", textAlign: "center", fontSize: "20px"
    }
};


class JoinSession extends React.Component
{

    // do when component gets mounted
    componentDidMount()
    {
        // - Hashed token received in the URL after being redirected from when signing in
        // - call getHashParams to get parse values in the URL
        this.getHashParams();
        
    }

    constructor(props)
        {
            super(props);
            this.state = {
                headerText: "",
                view: '',
                userData: {},
                hostID: '',
                sessionCode: '',
                sessionData: {},
                playlistContent: [],
                tracksInPlaylist: [],
                gotTracks: false,
                gotSearch: false,
                searchResults: [],
                query: "",
                trackToAdd: ''
            }
        }

    // get hashed token from URL and convert to text in JSON
    getHashParams()
    {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.href.split("#")[1];
        console.log(window.location.href.split("#"));
        if (window.location.href.split("#").length === 1)
        {
            return;
        }
        while (e = r.exec(q))
        {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        console.log(hashParams);
        const headerText = `${hashParams.token_type} ${hashParams.access_token}`;
        this.setState({ headerText });
        this.callApi(headerText);
        return hashParams;
    }

    // - API: call api to get a snapshot of the users profile
    async callApi(headerText)
    {
        console.log(headerText);
        if (true)
        {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    "Authorization": headerText
                }
            });
            const json = await response.json()
            this.setState({ userData: json });
        }
        console.log(this.state.userData);
    }

    // - API: return the tracks of a playlist
    async getPlaylistTracks(headerText)
    {
        // const response = await fetch(`https://api.spotify.com/v1/users/alfredovargas/playlists/${this.state.sessionData.id}/tracks`, {
        const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists/${this.state.sessionCode}/tracks`, {
            method: 'GET',
            headers: {
                'Authorization': headerText,
            }
        });
        const json = await response.json();
        this.state.playlistContent = json.items;
        this.state.tracksInPlaylist = [];
        for (var e in this.state.playlistContent)
            {
                var track = this.state.playlistContent[e].track;
                this.state.tracksInPlaylist.push(track);
                console.log(track);
        }
        this.setState({ gotTracks: true });
    }

    // - API: search for a track 
    async searchTrack(headerText, name)
    {
        var uri = encodeURI(name);
        const response = await fetch(`https://api.spotify.com/v1/search?q=${uri}&type=track`, {
            method: 'GET',
            headers: {
                'Authorization': headerText,
            },
            accept: 'application/json'
        });
        const json = await response.json();
        this.setState({ searchResults: json.tracks.items });
        console.log(this.state.searchResults);
        this.setState({ gotSearch: true });
    }

    // - API: add a track (uris) to a playlist id
    async addTrackToSession(headerText, trackuri)
    {
        var uri = encodeURI(trackuri);
        // const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists/${this.state.sessionData.id}/tracks?uris=${uri}`, {
        const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists/${this.state.sessionCode}/tracks?uris=${uri}`, {
            method: 'POST',
            headers: {
                'Authorization': headerText,
            },
            'Content-Type': 'application/json'
        });
        const json = await response.json();
        console.log(json);
    }

    // - API: follow a playlist, need to follow a collaboraive playlist to add a song
    async followPlaylist(headerText, playlistID)
    {
        const response = await fetch(`https://api.spotify.com/v1/users/${this.state.hostID}/playlists/${this.state.sessionCode}/followers`, {
            method: 'PUT',
            headers: {
                'Authorization': headerText,
            },
            'Content-Type': 'application/json'
        });
        const json = await response.json();
        console.log(json);
    }

    // - API: follow a playlist, need to follow a collaboraive playlist to add a song
    async getPlaylist(headerText, playlistID)
    {
        // const response = await fetch(`https://api.spotify.com/v1/users/${this.state.hostID}/playlists/${this.state.sessionCode}`, {
        const response = await fetch(`https://api.spotify.com/v1/users/1238233927/playlists/3849ymGTHFxcQxI3YpRD6D`, {
            method: 'GET',
            headers: {
                'Authorization': headerText,
            }
        });
        const json = await response.json();
        this.setState({ sessionData: json });
        console.log(json);
    }

    render()
    {
        var state = generateRandomString(16);
        console.log("In sign in");
        switch(this.state.view){
            case 'player':
                return (
                    <div>
                        <SessionBanner sessionInfo={this.state.sessionData} />
                        <Grid style={{ padding: '30px' }}>
                            <Row>
                                <PanelGroup accordion id="accordion-example" defaultActiveKey="2">
                                    <Panel eventKey="1" onClick={() => { this.getPlaylistTracks(this.state.headerText) }}>
                                        <Panel.Heading style={styles.panelDark} >
                                            <Panel.Title style={styles.centerWhiteBold} toggle>Playlist</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            {displayTracks(this.state.gotTracks, this.state.tracksInPlaylist, this.handleTrackClick, false)}
                                        </Panel.Body>
                                    </Panel>
                                    <Panel eventKey="2" /*onClick={() => { this.searchTrack(this.state.headerText, 'better now') }}*/>
                                        <Panel.Heading style={styles.panelDark}>
                                            <Panel.Title style={styles.centerWhiteBold} toggle>Add a Song</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            <Grid>
                                                <Row>
                                                    <Col sm={10} xs={10} style={{ paddingLeft: '0px' }}>
                                                        <FormControl bsSize="lg"
                                                            type={this.state.sessionName}
                                                            label="Search Query"
                                                            placeholder="Enter a Song Name"
                                                            onChange={(e) => { this.state.query = e.target.value; console.log(this.state.query) }}
                                                        />
                                                    </Col>
                                                    <Col sm={2} xs={2} style={{ padding: '0px' }}>
                                                        <Button bsStyle="primary" onClick={() => { this.searchTrack(this.state.headerText, this.state.query) }}>
                                                            <p>Enter</p>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    {displayTracks(this.state.gotTracks, this.state.searchResults, this.handleTrackClick, true)}
                                                </Row>
                                            </Grid>
                                        </Panel.Body>
                                    </Panel>
                                    {/* <Panel eventKey="3">
                                        <Panel.Heading>
                                            <Panel.Title toggle>Collapsible Group Item #3</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            
                                        </Panel.Body>
                                    </Panel> */}
                                </PanelGroup>
                            </Row>
                        </Grid>
                    </div>
                );
            case 'joinWindow':
                return(
                    <div style={{ backgroundColor: "#ecebe8", height: window.innerHeight, }}>
                            <Grid style={{padding: '30px'}}>
                                <Row>
                                    <Panel>
                                        <Panel.Heading style={{ backgroundImage: "none", backgroundColor: "#191414" }}>
                                            <Panel.Title componentClass="h" style={{ color: "white", textAlign: "left", fontSize: "20px"}}><h2>Join A Session</h2></Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                            <form>
                                                <h3>Host ID:</h3>
                                                <FormControl bsSize='large'
                                                    type={this.state.hostID}
                                                    placeholder="Enter Host's ID"
                                                    onChange={(e) => { this.setState({ hostID: e.target.value }); console.log(this.state.hostID) }}
                                                    
                                                />
                                                <h3>Session Code:</h3>
                                                <FormControl bsSize='large'
                                                    type={this.state.sessionDescription}
                                                    placeholder="Enter A Session Code"
                                                    onChange={(e) => {this.setState({ sessionCode: e.target.value }); console.log(this.state.sessionCode) }}
                                                />
                                                <div style={{padding: '20px'}}>
                                                <Button bsSize="large" style={{ padding: '10px' }} onClick={() => { ((this.state.hostID).length < 1 || this.state.sessionCode.length < 1) ? console.log('Need Name') : /*this.followPlaylist(this.headerText, this.state.sessionCode); */this.getPlaylist(this.state.headerText, this.state.sessionCode); this.state.view = 'player'} } block>
                                                        <p>join</p>
                                                </Button>
                                                </div>
                                            </form> 
                                        </Panel.Body>
                                    </Panel>
                                </Row>
                            </Grid>
                        </div>

                );
            default:
                this.state.view = 'joinWindow';
                return (
                    <Grid>
                        <Jumbotron>
                            <h1>Sign Into Your Spotify Account To Join A Session</h1>
                            <p>
                                This App needs you to log in so you can Jamm!.
                            </p>
                            <p>
                                <Button href={'https://accounts.spotify.com/authorize?' +
                                    querystring.stringify({
                                        response_type: 'token',
                                        client_id: client_id,
                                        scope: scope,
                                        redirect_uri: redirect_uri,
                                        state: state
                                    })
                                } bsStyle="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Grid>
                );
        } 
        // }
    }
}

export default JoinSession;