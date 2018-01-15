import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Form from '../form/Form';

import {signin} from '../../actions/auth';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmitClick = this
            .handleSubmitClick
            .bind(this);
    }

    handleSubmitClick() {
        this
            .props
            .signin(this.state.username, this.state.password);
    }

    render() {
        const {from} = this.props.location.state || {
            from: {
                pathname: '/'
            }
        };
        if (this.props.auth.isAuthenticated) {
            return (<Redirect to={from.pathname}/>)
        }

        const fields = [
            {
                text: 'Pseudo',
                type: 'text',
                name: 'username'
            }, {
                text: 'Mot de passe',
                type: 'password',
                name: 'password'
            }
        ];
        return (
            <div className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h2 className="text-center my-3">Connexion</h2>
                            <Form fields={fields} triggerSubmitFunction={this.props.signin}/>
                            <hr/>
                            <p className="text-center">
                                <Link to="/signup">Pas de compte ?</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Signin.propTypes = {
    signin: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({
    signin
}, dispatch);

Signin = connect(null, mapDispatchToProps)(Signin);

export default Signin;
