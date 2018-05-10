import React from 'react';
import
{
    Jumbotron,
    Button,
    Grid,
    Panel,
    PanelGroup,
    Row,
    Col,
    FormControl,
    Badge
} from "react-bootstrap";
import querystring from "querystring";
import Track from "./Track";
import SessionBanner from "./SessionBanner";
import Loading from "./Loading";
import { request } from 'graphql-request';    

// Your client id
var client_id = 'f18adfa22eb64b1b9a74ce823ca80b3b';
// Your redirect uri
var redirect_uri = 'http://localhost:3000/CreateSession';
//scope for token
var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative';



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

/**
 * Display the tracks of the session's playlist
 * @param {boolean} bool - proced when available
 * @param {object list} tracks - list of tracks to be displayed, received from Spotify's API, getPlaylist()
 * @param {method} handleTrackClick - method to handle onClick of the Track component
 * @param {boolean} clickable - make the track clickable to the user
 */
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

/**
 * Styling for css
 */
const styles = {
    panelDark: {
        backgroundImage: "none",
        backgroundColor: "#191414",

    },
    centerWhiteBold: {
        color: "white", textAlign: "center", fontSize: "20px"
    },
    JammJumbo: {
        backgroundColor: "rgb(45, 45, 45)",
        color: "#84bd00",
        position: "relative",
        width: "100%",
        marginBottom: "0px",
        padding: "20px"
    }
};

/**
 * Class CreateSession: This is where the Host interacts with the UI
 *  - react component
 *  - render upon mounting of component
 */
class CreateSession extends React.Component
{
    // async componentDidMount()
    // {        
    //     // const response = await fetch(`https://accounts.spotify.com/authorize?client_id=${userName.trim()}`);
    //     // const response = await fetch(`https://accounts.spotify.com/authorize?client_id=f18adfa22eb64b1b9a74ce823ca80b3b&redirect_uri=http:%2F%2Flocalhost:3000`);
    //     const response = await fetch(`https://accounts.spotify.com/authorize?client_id=f18adfa22eb64b1b9a74ce823ca80b3b&redirect_uri=http:%2F%2Flocalhost:3000`);
    //     const fetchedObject = response.json();
    //     this.setState({fetchedObject})

    // }

    // do when component gets mounted
    componentDidMount()
    {
        // - Hashed token received in the URL after being redirected from when signing in
        // - call getHashParams to get parse values in the URL
        this.getHashParams();
        
    }

    // create props instance
    constructor(props)
    {
        super(props);
        this.state = {
            headerText: "",
            userData: {},
            view: '',
            sessionName: "",
            sessionDescription: "",
            sessionData: {
                "collaborative": false,
                "description": "This is made from our app!!!",
                "external_urls": {
                    "spotify": "http://open.spotify.com/user/thelinmichael/playlist/7d2D2S200NyUE5KYs80PwO"
                },
                "followers": {
                    "href": null,
                    "total": 0
                },
                "href": "https://api.spotify.com/v1/users/thelinmichael/playlists/7d2D2S200NyUE5KYs80PwO",
                "id": "7d2D2S200NyUE5KYs80PwO",
                "images": [ ],
                "name": "A New Playlist",
                "owner": {
                    "external_urls": {
                    "spotify": "http://open.spotify.com/user/thelinmichael"
                    },
                    "href": "https://api.spotify.com/v1/users/thelinmichael",
                    "id": "thelinmichael",
                    "type": "user",
                    "uri": "spotify:user:thelinmichael"
                },
                "public": false,
                "snapshot_id": "s0o3TSuYnRLl2jch+oA4OEbKwq/fNxhGBkSPnvhZdmWjNV0q3uCAWuGIhEx8SHIx",
                "tracks": {
                    "href": "https://api.spotify.com/v1/users/thelinmichael/playlists/7d2D2S200NyUE5KYs80PwO/tracks",
                    "items": [ ],
                    "limit": 100,
                    "next": null,
                    "offset": 0,
                    "previous": null,
                    "total": 0
                },
                "type": "playlist",
                "uri": "spotify:user:thelinmichael:playlist:7d2D2S200NyUE5KYs80PwO"
                },
            playlistContent: [],
            tracksInPlaylist: [],
            gotTracks: false,
            gotSearch: false,
            searchResults: [],
            query: "",
            trackToAdd: '',
            sessionGraph: {},
            sessionGraphAdd: [],
            updatePlayer: false,
            requestBadge: 0
        };
        this.handleTrackClick = this.handleTrackClick.bind(this);

    }

    /**
     * Add the passed track uri to the playlist, using Spotify's API
     * @param {string} trackToAdd 
     */
    handleTrackClick(trackToAdd)
    {
        console.log(trackToAdd);
        // this.setState({ trackToAdd: trackToAdd });
        this.addTrackToSession(this.state.headerText, trackToAdd);
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

    // Spotify API: call api to get a snapshot of the users profile
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

    // Spotify API: use the API to create a collaborative playlist
    async createPlaylist(headerText, name, desc)
    {
        this.setState({ view: 'player' });
        const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': headerText,
                'Content-type': "application/json",
            },
            body: JSON.stringify({
                collaborative: true,
                name: name,
                description: desc,
                public: false

            })
        });
        const json = await response.json();
        this.setState({ sessionData: json });
        this.createSessionGraph(this.state.sessionData.id);
        this.state.sessionData = json;
        console.log(json);
    }

    // - Spotify API: return the tracks of a playlist
    async getPlaylistTracks(headerText)
    {
        const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists/${this.state.sessionData.id}/tracks`, {
        // const response = await fetch(`https://api.spotify.com/v1/users/alfredovargas/playlists/0LXTq08rGJWw6x2dURPs5a/tracks`, {
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

    // - Spotify API: search for a track 
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

    // - Spotify API: add a track (uris) to a playlist id
    async addTrackToSession(headerText, trackuri)
    {
        var uri = encodeURI(trackuri);
        const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists/${this.state.sessionData.id}/tracks?uris=${uri}`, {
        // const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists/0LXTq08rGJWw6x2dURPs5a/tracks?uris=${uri}`, {
            method: 'POST',
            headers: {
                'Authorization': headerText,
            },
            'Content-Type': 'application/json'
        });
        const json = await response.json();
        console.log(json);
    }

    /**
     * Graphcool - Using a serverless database for the backend
            - fetch built-in API calls to the database held by Graphcool
     */
    
    // fetch a query of the current session from the database
    //  - return a JSON of all the content of the session
    //  - get the tracks that are to be added from the database
    async fetchGraph(graphID)
    {   
        const query = `query getSession($graphID: ID!) {
            Session(id: $graphID) {
                id 
                trackses {
                    trackID
                    id
                }
            }
        }`
        console.log("this is in fetchgraph", graphID);
        // const data = await request('https://api.graph.cool/simple/v1/cjgww71fd4nfp018700vpvkmi', query, {graphID});
        const data = await request('https://api.graph.cool/simple/v1/cjgww71fd4nfp018700vpvkmi', query, {graphID});
        // this.setState({ s: data });
        var tracksToAdd = data.Session.trackses;
        console.log(data.Session.trackses);
        console.log(tracksToAdd);
        //  if tracks are to be added
        //  - get track info from database then call Spotify's API to add it to the session, then remove it from the database
        if (tracksToAdd.length > 0)
        {
            for (var i in tracksToAdd)
            {
                var track = tracksToAdd[i];
                console.log(track);
                this.removeTrackGraph(track.id);
                this.addTrackToSession(this.state.headerText, track.trackID);
            }
        }
    }
    
    /**
     * set a badge value of the number of tracks in the database to be added to the session
     * @param {string} graphID 
     */
    async badgeRequestsGraph(graphID)
    {   
        const query = `query getSession($graphID: ID!) {
            Session(id: $graphID) {
                id 
                trackses {
                    trackID
                    id
                }
            }
        }`
        console.log("this is in fetchgraph", graphID);
        // const data = await request('https://api.graph.cool/simple/v1/cjgww71fd4nfp018700vpvkmi', query, {graphID});
        const data = await request('https://api.graph.cool/simple/v1/cjgww71fd4nfp018700vpvkmi', query, {graphID});
        // this.setState({ s: data });
        var tracksToAdd = data.Session.trackses;
        console.log(data.Session.trackses);
        console.log(tracksToAdd);
        // this.removeTrackGraph("cjgwwohnd0wm301049e8f5yso");
        this.setState({ requestBadge: tracksToAdd.length });
    }

    /**
     * Remove a track from the database using the track id
     * @param {string} trackGID 
     */
    async removeTrackGraph(trackGID)
    {
        const mutation = `mutation delSession($trackGID: ID!) {
            deleteTracks(id: $trackGID) {
                id
                trackID
            }
        }`

        const data = await request('https://api.graph.cool/simple/v1/cjgww71fd4nfp018700vpvkmi', mutation, {trackGID});
        console.log(data);

    }

    /**
     * Create an instance of a session in the database
     *  - a JSON is returned with the information created
     *      - keel the database session id for mutations
     * @param {*} sessionID 
     */
    async createSessionGraph(sessionID)
    {
        const mutation = `mutation($sessionID: String!){
            createSession(
                sessionID: $sessionID
            ){
                id
            }
        }` 

        const data = await request('https://api.graph.cool/simple/v1/cjgww71fd4nfp018700vpvkmi', mutation, { sessionID });
        
        this.setState({ sessionGraph: data.createSession });
        console.log(data);
        console.log(this.state.sessionGraph.id);

    }
    
    /**
     * Render method, part of the React frame work
     *  - return html to the index file using javascript
     *  - component gets rerendered whenever tis state changes
     */
    render()
    { 
        var state = generateRandomString(16);
        if (Object.keys(this.state.userData).length > 0)
        {
            switch (this.state.view)
            {
                case 'player':    
                    /**
                     * The session window
                     *  - includes
                     *      - session banner
                     *      - the player
                     *      - add request button
                     *      - the playlist
                     *      - and the search window
                     */    
                    return (
                        <div>
                            <SessionBanner sessionInfo={this.state.sessionData} viewPlayer={true} />
                            <Grid style={{ padding: '30px' }}>
                                <Row style={{ padding: '15px' }}>
                                    <Button bsSize="large" style={{ paddingBottom: '10px' }}
                                        onClick={() =>
                                        {
                                            console.log(this.state.sessionGraph.id);
                                            this.fetchGraph(this.state.sessionGraph.id);
                                            this.badgeRequestsGraph(this.state.sessionGraph.id);
                                        }} block>
                                        <p>Add Requests <Badge>{this.state.requestBadge}</Badge></p>
                                    </Button>
                                </Row>
                                <Row>
                                    <PanelGroup accordion id="accordion-example" defaultActiveKey="2">
                                        <Panel eventKey="1" onClick={() =>
                                        {
                                            this.getPlaylistTracks(this.state.headerText);
                                            this.badgeRequestsGraph(this.state.sessionGraph.id);
                                        }}>
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
                                                    <Col sm={10} xs={10} style={{paddingLeft:'0px'}}>
                                                        <FormControl bsSize="lg"
                                                            type={this.state.sessionName}
                                                            label="Search Query"
                                                            placeholder="Enter a Song Name"
                                                            onChange={(e) => { this.state.query = e.target.value; console.log(this.state.query) }}
                                                        />
                                                    </Col>
                                                    <Col sm={2} xs={2} style={{padding:'0px'}}>
                                                        <Button bsStyle="primary" onClick={() => {this.searchTrack(this.state.headerText, this.state.query)}}>
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
                                </PanelGroup>
                                </Row>
                            </Grid>
                        </div>
                    );
                default:
                    /**
                     * The create a session window
                     *  - gets users inputs to create the session
                     */    
                    return (
                        <div style={{ backgroundColor: "#ecebe8", height: window.innerHeight, }}>
                            <Grid style={{padding: '30px'}}>
                                <Row>
                                    <Panel>
                                        <Panel.Heading style={{ backgroundImage: "none", backgroundColor: "#191414" }}>
                                            <Panel.Title componentClass="h" style={{ color: "white", textAlign: "left", fontSize: "20px"}}><h2>Create A Session</h2></Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                            <form>
                                                <h3>Name:</h3>
                                                <FormControl bsSize='large'
                                                    id="formControlsSessionName"
                                                    type={this.state.sessionName}
                                                    label="Session Name"
                                                    placeholder="Enter A Session Name"
                                                    onChange={(e) => { this.setState({ sessionName: e.target.value }); console.log(this.state.sessionName) }}
                                                    
                                                />
                                                <h3>Description:</h3>
                                                <FormControl bsSize='large'
                                                    id="formControlsSessionDescription"
                                                    type={this.state.sessionDescription}
                                                    label="Session Description"
                                                    placeholder="Enter A Description"
                                                    onChange={(e) => {this.setState({ sessionDescription: e.target.value }); console.log(this.state.sessionDescription) }}
                                                />
                                                <div style={{padding: '20px'}}>
                                                    <Button bsSize="large" style={{ padding: '10px' }}
                                                        onClick={() =>
                                                        {
                                                            if (this.state.sessionData.length < 1)
                                                            {
                                                                console.log("Need name");
                                                            } else
                                                            {
                                                                
                                                                this.createPlaylist(this.state.headerText, this.state.sessionName, this.state.sessionDescription);
                                                                console.log(this.state.sessionData);
                                                                    /* this.createSessionGraph(this.state.sessionName); */
                                                                console.log('after create playlist');
                                                                this.setState({ view: 'player' });
                                                                    /* const data = await this.createSessionGraph(this.state.sessionData.id); */
                                                            }
                                                            
                                                        }} block>
                                                        <p>create</p>
                                                    </Button>
                                                </div>
                                            </form> 
                                        </Panel.Body>
                                    </Panel>
                                </Row>
                            </Grid>
                        </div>

            ); 
            }
            
        } 

        /**
         * The sign in page for the user to enter their credentials
         *  - needed to receive a token to use the API
         */
        return (
            <Grid style={{ padding: '30px' }}>
                <Jumbotron style={styles.JammJumbo}>
                    <h1 style={{ color: "#1db954" }}>Connect To Your Spotify Account To Begin A Session</h1>
                    <h3 style={{ color:"white"}}>Sign In To Start Jamming</h3>
                    <p>
                        <Button href={'https://accounts.spotify.com/authorize?' +
                            querystring.stringify({
                                response_type: 'token',
                                client_id: client_id,
                                scope: scope,
                                redirect_uri: redirect_uri,
                                state: state
                            })
                        } bsStyle="primary"><h5>Connect to Spotify</h5></Button>
                    </p>
                </Jumbotron>
            </Grid>
        );   
    }
}

export default CreateSession;