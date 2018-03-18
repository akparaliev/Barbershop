import Header from '../sections/Header.jsx';
import Footer from '../sections/Footer.jsx'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'




class Layout extends Component {
    render() {
        const { dispatch, services, isAuthenticated, errorMessage, user, visits, notifications} = this.props;
        return (
            <div>
                <Header isAuthenticated={isAuthenticated}
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                    userName={user?user.name:''}
                />
                <section class="masthead bg-primary text-white text-center height-800">
                    {React.cloneElement(this.props.children, {
                        dispatch: dispatch,
                        isAuthenticated:isAuthenticated,
                        services:services,
                        userId: user ? user.id : '',
                        visits: visits,
                        notifications: notifications
                    })}
                </section>
                <Footer />         
            </div>
        )
    }
}
Layout.propTypes = {
    dispatch: PropTypes.func.isRequired,
    services: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    user: PropTypes.object,
    visits: PropTypes.object,
    notifications: PropTypes.array
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

    const { service, auth,visit, notifications } = state
    const { services } = service
    const { isAuthenticated, errorMessage, user } = auth
    const { visits } = visit

    return {
        services,
        isAuthenticated,
        errorMessage,
        user,
        visits,
        notifications
    }
}

export default connect(mapStateToProps)(Layout)