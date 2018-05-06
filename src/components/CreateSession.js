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

const displayTracks = (bool, tracks, handleTrackClick) =>
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
                    />
                // </div>
            );
        }
    }
    return tracksDisplay;
};

// const displaySearch = (bool, tracks) =>
// {
//     let tracksDisplay = []
//     if (bool === true)
//     {

//         for (var e in tracks)
//         {
//             tracksDisplay.push(
//                 <div key={e}>
//                     <Track
//                         Loading={Loading}
//                         photo={tracks[e].album.images[2].url}
//                         title={tracks[e].name}
//                         artist={tracks[e].artists[0].name}
//                     />
//                 </div>
//             )
//         }
//     }
//     return tracksDisplay;
// };

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
            sessionData: {},
            playlistContent: [],
            tracksInPlaylist: [],
            gotTracks: false,
            gotSearch: false,
            searchResults: [],
            query: "",
            trackToAdd: ''
        };
        this.handleTrackClick = this.handleTrackClick.bind(this);

    }

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

    // API: use the API to create a collaborative playlist
    async createPlaylist(headerText, name, desc)
    {
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
        this.state.sessionData = json;
        console.log(json);
    }

    // - API: return the tracks of a playlist
    async getPlaylistTracks(headerText)
    {
        const response = await fetch(`https://api.spotify.com/v1/users/alfredovargas/playlists/5XhUeEN3Y5IwuUuvfHxPFH/tracks`, {
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
        const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists/5XhUeEN3Y5IwuUuvfHxPFH/tracks?uris=${uri}`, {
            method: 'POST',
            headers: {
                'Authorization': headerText,
            },
            'Content-Type': 'application/json'
        });
        const json = await response.json();
        console.log(json);
    }

    render()
    { 
        var state = generateRandomString(16);
        if (Object.keys(this.state.userData).length > 0)
        {
            switch (this.state.view)
            {
                case 'player':    
                    return (
                        <div>
                            <Grid style={{ padding: '30px' }}>
                                <Row>
                                <PanelGroup accordion id="accordion-example">
                                    <Panel eventKey="1" onClick={() => { this.getPlaylistTracks(this.state.headerText)}}>
                                        <Panel.Heading>
                                            <Panel.Title toggle>Playlist</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            {displayTracks(this.state.gotTracks, this.state.tracksInPlaylist, this.handleTrackClick)}
                                        </Panel.Body>
                                    </Panel>
                                    <Panel eventKey="2" /*onClick={() => { this.searchTrack(this.state.headerText, 'better now') }}*/>
                                        <Panel.Heading>
                                            <Panel.Title toggle>Add a Song</Panel.Title>
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
                                                    {displayTracks(this.state.gotTracks, this.state.searchResults, this.handleTrackClick)}
                                                </Row>    
                                            </Grid>
                                        </Panel.Body>
                                    </Panel>
                                    <Panel eventKey="3">
                                        <Panel.Heading>
                                            <Panel.Title toggle>Collapsible Group Item #3</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            
                                        </Panel.Body>
                                    </Panel>
                                </PanelGroup>
                                </Row>
                            </Grid>
                        </div>
                    );
                default:
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
                                                    <Button bsSize="large" style={{ padding: '10px' }} onClick={() => { ((this.state.sessionName).length < 1) ? console.log('Need Name') : /*this.createPlaylist(this.state.headerText, this.state.sessionName, this.state.sessionDescription);*/ console.log('cliked'); this.setState({ view: 'player' }); console.log(this.state.view)}} block>
                                                        <p>create</p>
                                                    </Button>
                                                </div>
                                            </form> 
                                        </Panel.Body>
                                    </Panel>
                                </Row>
                            </Grid>
                        </div>
                        
                        // <div>
                        //     {this.state.userData.email}
                        //     <Button
                        //         onClick={() =>
                        //        {
                        //            this.state.view = 'CreateSessionView';
                        //            this.createPlaylist(this.state.headerText);
                        //            this.render();
                        //         }}>Create a playlist</Button>
                        // </div>
            ); 
            }
            
        } 

        return (
            <Grid>
                <Jumbotron>
                    <h1>Sign Into Your Spotify Account To Begin A Session</h1>
                    <p>
                        This App Needs You To Log In To Access Your Playlists.
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
        
        
}

export default CreateSession;