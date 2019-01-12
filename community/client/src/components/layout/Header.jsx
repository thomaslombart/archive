import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { signout } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Header extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect fluid style={{ borderRadius: "0px" }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Community</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/chat">
                            <NavItem eventKey={1}>
                                <div className="header-link-container">
                                    <i className="material-icons">chat</i>
                                    <span className="icon-description">Chat</span>
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to="/polls">
                            <NavItem eventKey={2}>
                                <div className="header-link-container">
                                    <i className="material-icons">donut_small</i>
                                    <span className="icon-description">Polls</span>
                                </div>
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    {this.props.auth.isAuthenticated ? (
                        <Nav pullRight>
                            <LinkContainer to="/profile">
                                <NavItem eventKey={1}>
                                    <div className="header-link-container">
                                        <i className="material-icons">account_circle</i>
                                        <span className="icon-description">Account</span>
                                    </div>
                                </NavItem>
                            </LinkContainer>
                            <NavItem eventKey={2} onClick={() => this.props.signout()}>
                                <div className="header-link-container">
                                    <i className="material-icons">close</i>
                                    <span className="icon-description">Logout</span>
                                </div>
                            </NavItem>
                        </Nav>
                    ) : (
                            <Nav pullRight>
                                <LinkContainer to="/signin">
                                    <NavItem eventKey={1}>
                                        <div className="header-link-container">
                                            <i className="material-icons">person</i>
                                            <span className="icon-description">Signin</span>
                                        </div>
                                    </NavItem>
                                </LinkContainer>
                                <LinkContainer to="/signup">
                                    <NavItem eventKey={2}>
                                        <div className="header-link-container">
                                            <i className="material-icons">person_add</i>
                                            <span className="icon-description">Signup</span>
                                        </div>
                                    </NavItem>
                                </LinkContainer>
                            </Nav >
                        )}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => bindActionCreators({
    signout
}, dispatch);

Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

export default Header;