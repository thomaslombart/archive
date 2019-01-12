import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    render() {
        const { component: Component, auth, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                auth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: { from: props.location, message: 'Access denied : you must be logged to access that page !' }
                        }} />
                    )
            )} />
        )
    }
}

const mapStateToProps = (state) => ({ auth: state.auth });

PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRoute));

export default PrivateRoute;