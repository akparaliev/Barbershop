import React, { Component, PropTypes } from 'react'
import { fetchVisits, cancelServiceVisit } from '../services/ActionService'
import moment from 'moment'
import Notifications from 'react-notification-system-redux';
export default class Services extends React.Component {
    constructor(props) {
        super(props);
        props.isAuthenticated && props.dispatch(fetchVisits(props.userId));
    }

    cancelVisit(id) {
        this.props.dispatch(cancelServiceVisit(id)).then(() => {
            this.props.dispatch(Notifications.success({title: 'Visit is cancelled'}));
            this.props.dispatch(fetchVisits(this.props.userId))
        });
    }


    render() {
        const { isAuthenticated, visits, dispatch, userId, notifications } = this.props
        return (
            <div class="center-block">
                {visits && visits.length>0 && isAuthenticated &&
                    <table class="table table-striped ">
                        <thead class="thead-light">
                            <tr>
                                <th class="w-25">Service name</th>
                                <th class="w-25">Visit date</th>
                                <th class="w-25">Is canceled?</th>
                                <th class="w-25">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visits.map((visit) =>
                                <tr>
                                    <td>
                                        <span>{visit.serviceName}</span>
                                    </td>
                                    <td>
                                        <span>{moment(visit.dateTime).format('MM/DD/YYYY h:mm a')}</span>
                                    </td>
                                    <td>
                                        <span>{visit.isCancelled?'cancelled': 'not cancelled'}</span>
                                    </td>
                                    <td>
                                    {visit.isFutureVisit && !visit.isCancelled &&
                                        <button type="button" class="btn button-primary" title="Cancel visit" onClick={this.cancelVisit.bind(this, visit.id)}>
                                            <i class="fa fa-ban"></i>
                                        </button>
                                    }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table >        
                }
                <Notifications notifications={notifications} />
            </div>
        );
    }
}