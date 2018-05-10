import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import LoadingComponent from "../components/Loading";
import PropTypes from "prop-types";
import { Alert, Button } from "react-bootstrap";

/**
 * Load routes for the different componets to mount
 */
const HomeRoute = Loadable({
    loader: () => import("../components/Home"),
    loading: LoadingComponent
});

const PageNotFoundRoute = Loadable({
    loader: () => import("../components/PageNotFound"),
    loading: LoadingComponent
});

const CreateSessionRoute = Loadable({
    loader: () => import("../components/CreateSession"),
    loading: LoadingComponent
});

const JoinSessionRoute = Loadable({
    loader: () => import("../components/JoinSession"),
    loading: LoadingComponent
});

const RoutePath = ({
	location
}) => (
        <Switch key={location.key} location={location}>
            <Route exact path="/" component={HomeRoute} />
            <Route exact path="/CreateSession" component={CreateSessionRoute} />
            <Route exact path="/JoinSession" component={JoinSessionRoute} />
            <Route component={PageNotFoundRoute} />
        </Switch>
    );

RoutePath.propTypes = {
    location: PropTypes.object.isRequired
};

/**
 * Route component reroutes other as other components are called
 */
class Routes extends React.Component
{
    state = {
        error: "",
        errorInfo: ""
    }
    componentDidCatch(error, errorInfo)
    {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo
        });
        // You can also log error messages to an error reporting service here
    }
    // Reset the error variables
    handleDismiss()
    {
        this.setState({
            error: "",
            errorInfo: ""
        });
    }
    render()
    {
        const { error } = this.state;
        if (error === "")
        {
            return (
                <Route render={({
					location, history, match
				}) => (
                        <RoutePath location={location} />
                    )} />
            );
        }
        return (
            <Alert bsStyle="danger" onDismiss={() => this.handleDismiss()}>
                <h4>Oh snap! You got an error!</h4>
                <p>{`The error was '${error.message}'. But no worries, with React 16, the whole App doesn't crash and you can just restart this container.`}</p>
                <p>
                    <Button onClick={() => this.handleDismiss()}>Reset Page</Button>
                </p>
            </Alert>
        );
    }
}

export default Routes;