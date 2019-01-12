import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Row, Col, Grid } from 'react-bootstrap';
import { signin, clearErrors } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handleSubmitClick() {
        this.props.signin(this.state.username, this.state.password);
    }

    render() {
        const { from, message } = this.props.location.state || { from: { pathname: '/' } };
        if (this.props.auth.isAuthenticated) {
            return (
                <Redirect to={from.pathname} />
            )
        }
        return (
            <Grid className="app-container" fluid>
                {message && <h4 className="text-center auth-message">{message}</h4>}
                <Row>
                    <Col sm={6} smOffset={3}>
                        <Paper zDepth={2} style={{ padding: '15px' }}>
                            <Form>
                                <h2>Hello again</h2>
                                <TextField
                                    floatingLabelText="Username"
                                    fullWidth
                                    type="text"
                                    errorText={this.props.auth.field === 'username' ? this.props.auth.error : ''}
                                    onChange={this.handleUsernameChange}
                                /><br />
                                <TextField
                                    floatingLabelText="Password"
                                    fullWidth
                                    type="password"
                                    errorText={this.props.auth.field === 'password' ? this.props.auth.error : ''}
                                    onChange={this.handlePasswordChange}
                                /><br />
                                <RaisedButton label="Signin" primary={true} fullWidth onClick={this.handleSubmitClick} />
                                <div>
                                    <hr />
                                    <p className="text-center no-account">
                                        <Link to="/signup">No account ?</Link>
                                    </p>
                                </div>
                            </Form>
                        </Paper>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    signin,
    clearErrors
}, dispatch);

Signin = connect(mapStateToProps, mapDispatchToProps)(Signin);

export default Signin;
