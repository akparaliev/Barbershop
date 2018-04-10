import React, { Component } from 'react'
import ServicePopup from '../pages/popups/ServicePopup.jsx'
import VisitPopup from '../pages/popups/VisitPopup.jsx'
import { fetchServices, addService, deleteService, addServiceVisit } from '../services/actions/ServiceAction'
import Notifications from 'react-notification-system-redux'
import PropTypes from 'prop-types'

export default class Services extends Component {

    constructor(props) {
        super(props);

        props.isAuthenticated &&
            props.dispatch(fetchServices());

        this.state = {
            addServiceModalOpened: false,
            addServiceVisitModalOpened: false
        };
    }

    deleteRow(id) {
        this.props.dispatch(deleteService(id)).then(() => {
            this.props.dispatch(Notifications.success({
                title: 'Service deleted succesfully'
            }));
            this.props.dispatch(fetchServices())
        });
    }

    addVisit = (id) => this.setState({
        addServiceVisitModalOpened: true,
        serviceForVisitId: id
    })

    addRow = () => this.setState({
        addServiceModalOpened: true
    })

    handleAddServiceVisitModalClose = () => this.setState({
        addServiceVisitModalOpened: false
    })

    handleAddServiceModalClose = () => this.setState({
        addServiceModalOpened: false
    })

    render() {
        const { onServiceClick, isAuthenticated, services, dispatch, userId, notifications } = this.props;

        return (
            <div class="center-block">
                {isAuthenticated  &&
                    <div class="width-100 align-right">
                        <button type="button" class="site-button button-primary" onClick={this.addRow.bind(this)}>Add service</button>
                    </div>
                }
                {services && services.length>0 && isAuthenticated &&
                    <table class="table table-striped ">
                        <thead class="thead-light">
                            <tr>
                                <th class="w-75">Service name</th>
                                <th class="w-25">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) =>
                                <tr>
                                    <td>
                                        <span>{service.name}</span>
                                    </td>
                                    <td>
                                        {isAuthenticated &&
                                            <button type="button" class="btn button-primary" title="Delete" onClick={this.deleteRow.bind(this, service.id)}>
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        }
                                        {isAuthenticated &&
                                        <button type="button" class="btn button-primary" title="Add visit" onClick={this.addVisit.bind(this, service.id)}>
                                                <i class="fa fa-first-order"></i>
                                            </button>
                                        
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table >
                }
                {this.state.addServiceModalOpened &&
                    <ServicePopup onClose={this.handleAddServiceModalClose}
                        onClick={data => dispatch(addService(data)).then(() => {
                            this.handleAddServiceModalClose();
                            this.props.dispatch(Notifications.success({ title: 'Service added succesfully' }));
                            this.props.dispatch(fetchServices())
                        })}
                    >
                    </ServicePopup>
                }
                {this.state.addServiceVisitModalOpened && 
                    <VisitPopup onClose={this.handleAddServiceVisitModalClose}
                        serviceId={this.state.serviceForVisitId}
                        userId={userId}
                        onClick={data => dispatch(addServiceVisit(data)).then(() => {
                            this.handleAddServiceVisitModalClose();
                            this.props.dispatch(Notifications.success({ title: 'Visit added succesfully' }));
                        })}
                    >
                    </VisitPopup>
    
                }
                <Notifications notifications={notifications} />
            </div>
        );
    }
}

Services.propTypes = {
    dispatch: PropTypes.func.isRequired,
    services: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    userId: PropTypes.string,
    notifications: PropTypes.array,
    onServiceClick: PropTypes.func.isRequired
}