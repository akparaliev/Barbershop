import React, { Component } from 'react'
import { Link } from 'react-router'
import { loginUser, logoutUser, registerUser } from '../services/ActionService'
import PropTypes from 'prop-types'
import Login from '../pages/popups/Login.jsx'
import Register from '../pages/popups/Register.jsx'


export default class Header extends Component {
    state = { isLoginShowingModal: false, isRegisterShowingModal: false}
    handleLoginClick = () => this.setState({ isLoginShowingModal: true})
    handleRegisterClick = () => this.setState({ isRegisterShowingModal: true})
    handleClose = () => this.setState({ isLoginShowingModal: false, isRegisterShowingModal: false })
    handleLogOut = () => { this.props.dispatch(logoutUser()); this.setState({ isLoginShowingModal: false, isRegisterShowingModal: false })}
    render() {
        const { dispatch, isAuthenticated, errorMessage, userName } = this.props
        return (
            <header>      
                <nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
                    <div class="container">
                        <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i class="fa fa-bars"></i>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item mx-0 mx-lg-1">
                                    <Link to="/" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger">Main</Link>
                                </li>
                                <li class="nav-item mx-0 mx-lg-1">
                                    <Link to="services" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger">Services</Link>
                                </li>
                                <li class="nav-item mx-0 mx-lg-1">
                                    <Link to="history" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger">History</Link>
                                </li>
                                {!isAuthenticated &&
                                    <li class="nav-item mx-0 mx-lg-1">
                                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onClick={this.handleRegisterClick}>Register</a>
                                    </li>
                                }
                                {!isAuthenticated &&
                                    <li class="nav-item mx-0 mx-lg-1">
                                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onClick={this.handleLoginClick}>Login</a>
                                    </li>
                                }
                                {isAuthenticated &&
                                    <li class="nav-item mx-0 mx-lg-1">
                                    <span class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-white">Hi, {userName}</span>
                                    </li>
                                }
                                {isAuthenticated &&
                                    <li class="nav-item mx-0 mx-lg-1">
                                    <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onClick={this.handleLogOut}>LogOut</a>
                                    </li>
                                }
                            </ul>
                        </div>

                    </div>
                </nav>
                {this.state.isLoginShowingModal && !isAuthenticated &&
                    <Login onClose={this.handleClose}
                        errorMessage={errorMessage}
                        onLoginClick={creds => dispatch(loginUser(creds))}
                        class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger">
                    </Login>
                }
                {this.state.isRegisterShowingModal && !isAuthenticated &&
                    <Register onClose={this.handleClose}
                        errorMessage={errorMessage}
                        onRegisterClick={creds => dispatch(registerUser(creds))}
                        class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger">
                    </Register>
                }
            </header>
            
        )
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    userName: PropTypes.string
}