import React, { Component } from 'react'
import DateTime from 'react-datetime'
import moment from 'moment'
import PropTypes from 'prop-types'

export default class VisitPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            date: moment()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
             date: event
        });
    }

    handleClick() {
        this.props.onClick({
            datetime: this.state.date.toISOString(),
            serviceId: this.props.serviceId,
            userId: this.props.userId
        });
    }

    render() {
        const { onClose } = this.props;

        return (
            <div class="customModal fade show in" role="dialog">
                <div class="modal-dialog width-30">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title text-dark">Visit adding</h4>
                            <button type="button" class="close" onClick={onClose}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for='name' class="sr-only">Name</label>
                                <DateTime className="form-control" open={false}  closeOnSelect={true} value={this.state.date} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button onClick={this.handleClick} className="btn btn-custom btn-lg btn-block">Add</button>
                            <button type="button" class="btn btn-default" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

VisitPopup.propTypes = {
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}
