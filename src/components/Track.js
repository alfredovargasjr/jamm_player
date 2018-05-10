import React from "react";
import Loading from "./Loading";
import
{
    Panel,
    Grid,
    Col,
    Image,
    ListGroupItem
} from "react-bootstrap";

class Track extends React.Component
{
    constructor(props)
    {
        super(props);
        // this.onTrackClick = this.onTrackClick.bind(this);
    }

    /**
     * render the Track component
     *  - return the html using javascript
     */
    render()
    {
        const { loading, trackInfo, clickable } = this.props;
        /**
         * reutrn a track card with its information
         *  - onClick: return the tracks uri for requests
         */
        return (
            <Panel style={{ padding: "0px" }} onClick={(e) =>
            {
                if(clickable) { this.props.onTrackClick(trackInfo.uri) } 
            }}>
                <Grid style={{padding:"0px"}}>
                    <Col sm={2} xs={2} lg={1} style={{padding:"0px"}}>    
                        <Image style={{ padding: "0px" }} src={trackInfo.album.images[2].url} responsive/>
                    </Col>
                    <Col sm={9} xs={9} ls={11} fluid="true" style={{ padding: "0px" }}>
                        <ListGroupItem style={{ border: '0px' }} header={trackInfo.name}>{trackInfo.artists[0].name}</ListGroupItem>
                    </Col>
                </Grid>
            </Panel>
        );
        
    }
}

export default Track;