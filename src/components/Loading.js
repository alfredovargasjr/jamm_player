import React from "react";
import Spinner from "react-spinner-material";
const offset = 50;

const styles = {
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
};

class Loading extends React.Component
{
    state = {
        height: window.innerHeight - offset
    }

    updateDimensions()
    {
        let newHeight = window.innerHeight - offset;
        this.setState({
            height: newHeight
        });
    }

    componentDidMount()
    {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }
    render()
    {
        const { height } = this.props;
        return (
            <div
                style={{
                    ...styles.center, height: `${height !== undefined ? height : window.innerHeight - 50}px`
                }}
            >
                <Spinner
                    size={120}
                    spinnerColor={"#333"}
                    spinnerWidth={5}
                    visible={true}
                />
            </div>
        );
    }
}

export default Loading;
