import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import axios from 'axios';
import jwt from 'jsonwebtoken';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import auth from './reducers/auth';
import messages from './reducers/flash';
import errors from './reducers/errors';
import clan from './reducers/clan';
import members from './reducers/members';

import Signin from './components/auth/Signin.jsx';
import Signup from './components/auth/Signup.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import ClanTable from './components/table/ClanTable.jsx';
import NotFound from './components/NotFound.jsx';
import FlashMessagesList from './components/flash/FlashMessagesList';
import MembersList from './components/members/MembersList';
import Profile from './components/members/Profile';

import withRedirect from './hoc/withRedirect';
import withAuthenticate from './hoc/withAuthenticate';

import {AUTH_USER} from './actions/auth';

const rootReducer = combineReducers({auth, messages, errors, clan, members});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

const token = localStorage.getItem('jwt');
if (token) {
    axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
    store.dispatch({
        type: AUTH_USER,
        user: jwt.decode(token)
    });
}

/* FLASH MESSAGE */

let nextFlashId = 0;

export const flash = (content, alertClassName = 'success') => {
    store.dispatch({
        type: 'ADD_FLASH_MESSAGE',
        id: nextFlashId++,
        content,
        alertClassName
    });
}

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={ClanTable}/>
                <Route exact path="/members" component={MembersList}/>
                <Route path="/members/:tag" component={Profile}/>
                <Route path="/signin" component={withRedirect(Signin)}/>
                <Route path="/signup" component={withRedirect(Signup)}/>
                <Route component={NotFound}/>
            </Switch>
            <FlashMessagesList/>
            <Footer/>
        </div>
    </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
