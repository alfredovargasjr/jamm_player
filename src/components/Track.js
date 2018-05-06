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

    // handleClick(uri)
    // {
    //     this.props.onTrackClick(uri);
    //     console.log(uri);
    // }

    render()
    {
        const { loading, photo, title, artist, trackInfo } = this.props;
        return (
            // <Panel style={{padding:"0px"}}>
            //     <Grid style={{padding:"0px"}}>
            //         <Col sm={2} xs={2} style={{padding:"0px"}}>    
            //             <Image style={{padding:"0px"}} src={photo} responsive/>
            //         </Col>
            //         <Col sm={9} xs={9} fluid="true" style={{ padding: "0px" }}>
            //             <ListGroupItem style={{border:'0px'}} header={title}>{artist}</ListGroupItem>

            //         </Col>
            //     </Grid>
            // </Panel>
            <Panel style={{ padding: "0px" }} onClick={(e) =>
            {
                {/* console.log("does this appear?", trackInfo.uri); */}
                this.props.onTrackClick(trackInfo.uri)
            }}>
                <Grid style={{padding:"0px"}}>
                    <Col sm={2} xs={2} style={{padding:"0px"}}>    
                        <Image style={{ padding: "0px" }} src={trackInfo.album.images[2].url} responsive/>
                    </Col>
                    <Col sm={9} xs={9} fluid="true" style={{ padding: "0px" }}>
                        <ListGroupItem style={{ border: '0px' }} header={trackInfo.name}>{trackInfo.artists[0].name}</ListGroupItem>
                    </Col>
                </Grid>
            </Panel>
        );
        
    }
}

export default Track;