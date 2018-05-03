import React from 'react';
import
{
    Jumbotron,
    Button,
    Grid
} from "react-bootstrap";
import querystring from "querystring";

var client_id = 'f18adfa22eb64b1b9a74ce823ca80b3b'; // Your client id
var redirect_uri = 'http://localhost:3000/CreateSession'; // Your redirect uri
var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';



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

    componentDidMount()
    {

            this.getHashParams();
        
    }
    constructor(props)
    {
        super(props)
        this.state = {
            headerText: "",
            userData: {}
        }
    }

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
        this.setState({ headerText })
        this.callApi(headerText);
        return hashParams;
    }

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
    }

    render()
    { 
        var state = generateRandomString(16);
        
        
        if (Object.keys(this.state.userData).length > 0)
        {
            return (
                <div>{this.state.userData.email}</div>
            );
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