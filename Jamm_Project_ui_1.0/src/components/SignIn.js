import React from 'react';

class SignIn extends React.Component
{
    render()
    {
        return (
            <head>This is an empty component :(</head>
    //         <head>
    //             <title>Example of the Authorization Code flow with Spotify</title>
    //             <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    //                 <style type="text/css">
    //                     #login,
    //                     #loggedin {
    //                         display: none;
    //                     }

    //                     .text-overflow {
    //                         overflow: hidden;
    //                         text-overflow: ellipsis;
    //                         white-space: nowrap;
    //                         width: 500px;
    //                     }
    //                 </style>
    //         </head>

    //         <body>
    //             <div class="container">
    //                 <div id="login">
    //                     <h1>This is an example of the Authorization Code flow</h1>
    //                     <a href="/login" class="btn btn-primary">Log in with Spotify</a>
    //                 </div>
    //                 <div id="loggedin">
    //                     <div id="user-profile">
    //                     </div>
    //                     <div id="oauth">
    //                     </div>
    //                     <button class="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
    //                 </div>
    //             </div>

    //             <script id="user-profile-template" type="text/x-handlebars-template">
    //                 <h1>Logged in as {{ display_name }}</h1>
    //                 <div class="media">
    //                     <div class="pull-left">
    //                         <img class="media-object" width="150" src="{{images.0.url}}" />
    //                     </div>
    //                     <div class="media-body">
    //                         <dl class="dl-horizontal">
    //                             <dt>Display name</dt>
    //                             <dd class="clearfix">{{ display_name }}</dd>
    //                             <dt>Id</dt>
    //                             <dd>{{ id }}</dd>
    //                             <dt>Email</dt>
    //                             <dd>{{ email }}</dd>
    //                             <dt>Spotify URI</dt>
    //                             <dd><a href="{{external_urls.spotify}}">{{ external_urls.spotify }}</a></dd>
    //                             <dt>Link</dt>
    //                             <dd><a href="{{href}}">{{ href }}</a></dd>
    //                             <dt>Profile Image</dt>
    //                             <dd class="clearfix"><a href="{{images.0.url}}">{{ images.0.url }}</a></dd>
    //                             <dt>Country</dt>
    //                             <dd>{{ country }}</dd>
    //                         </dl>
    //                     </div>
    //                 </div>
    //             </script>

    //             <script id="oauth-template" type="text/x-handlebars-template">
    //                 <h2>oAuth info</h2>
    //                 <dl class="dl-horizontal">
    //                     <dt>Access token</dt>
    //                     <dd class="text-overflow">{{ access_token }}</dd>
    //                     <dt>Refresh token</dt>
    //                     <dd class="text-overflow">{{ refresh_token }}</dd>
    //                 </dl>
    //             </script>

    //             <script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.1/handlebars.min.js"></script>
    //             <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    //             <script>
    //                 (function ()
    //             {

    //                     /**
    //                      * Obtains parameters from the hash of the URL
    //                      * @return Object
    //                      */
    //                     function getHashParams()
    //                     {
    //                         var hashParams = {};
    //                         var e, r = /([^&;=]+)=?([^&;]*)/g,
    //                             q = window.location.hash.substring(1);
    //                         while (e = r.exec(q))
    //                         {
    //                             hashParams[e[1]] = decodeURIComponent(e[2]);
    //                         }
    //                         return hashParams;
    //                     }

    //         var userProfileSource = document.getElementById('user-profile-template').innerHTML,
    //             userProfileTemplate = Handlebars.compile(userProfileSource),
    //             userProfilePlaceholder = document.getElementById('user-profile');

    //         var oauthSource = document.getElementById('oauth-template').innerHTML,
    //             oauthTemplate = Handlebars.compile(oauthSource),
    //             oauthPlaceholder = document.getElementById('oauth');

    //         var params = getHashParams();

    //         var access_token = params.access_token,
    //             refresh_token = params.refresh_token,
    //             error = params.error;

    //         if (error)
    //         {
    //             alert('There was an error during the authentication');
    //                 } else
    //         {
    //             if (access_token)
    //             {
    //                     // render oauth info
    //                     oauthPlaceholder.innerHTML = oauthTemplate({
    //                         access_token: access_token,
    //                         refresh_token: refresh_token
    //                     });

    //                 $.ajax({
    //                     url: 'https://api.spotify.com/v1/me',
    //                     headers: {
    //                     'Authorization': 'Bearer ' + access_token
    //                     },
    //                     success: function (response)
    //                     {
    //                     userProfilePlaceholder.innerHTML = userProfileTemplate(response);

    //                 $('#login').hide();
    //                         $('#loggedin').show();
    //                     }
    //                 });
    //             } else
    //             {
    //                     // render initial screen
    //                     $('#login').show();
    //                 $('#loggedin').hide();
    //             }
    //         }
    //     })();
    // </script>
    //         </body>
        );
    }
}

export default SignIn;