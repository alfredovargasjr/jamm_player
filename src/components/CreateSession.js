import React from 'react';
import
{
    Jumbotron,
    Button,
    Grid
} from "react-bootstrap";
import querystring from "querystring";

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
        super(props)
        this.state = {
            headerText: "",
            userData: {},
            view: ""
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

    // API: use the API to create a collaborative playlist
    async createPlaylist(headerText)
    {
        const response = await fetch(`https://api.spotify.com/v1/users/${this.state.userData.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': headerText,
                'Content-type': "application/json",
            },
            body: JSON.stringify({
                collaborative: true,
                name: 'made from app',
                description: 'using api',
                public: false

            })
        });
        const json = await response.json();
        console.log(json);
    }



    render()
    { 
        var state = generateRandomString(16);
        
        
        if (Object.keys(this.state.userData).length > 0)
        {
            console.log(this.state.view)
            switch (this.state.view)
            {
                case 'CreateSessionView':
                    return (
                        <div>In CreateSessionView</div>
                    );
                default:
                   return (
                        <div>
                            {this.state.userData.email}
                            <Button
                                onClick={() =>
                               {
                                   this.state.view = 'CreateSessionView';
                                   this.createPlaylist(this.state.headerText);
                                   this.render();
                                }}>Create a playlist</Button>
                        </div>
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