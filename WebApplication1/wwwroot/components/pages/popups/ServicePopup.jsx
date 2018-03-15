import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ServicePopup extends Component {
    constructor(props) {
        super(props);
        this.state = { name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick() {
        this.props.onClick({
            name: this.state.name
        });
    }


    render() {

        const {  onClose } = this.props
        return (
            <div class="customModal fade show in" role="dialog">
                <div class="modal-dialog width-30">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title text-dark">Service adding</h4>
                            <button type="button" class="close" onClick={onClose}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for='name' class="sr-only">Name</label>
                                <input type='text' name='name' placeholder='Service name' className="form-control" value={this.state.name} onChange={this.handleChange} />
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

ServicePopup.propTypes = {
    onClick: PropTypes.func.isRequired
}