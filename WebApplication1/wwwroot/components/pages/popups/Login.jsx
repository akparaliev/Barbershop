import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', password: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value.trim()
        });
    }

    handleClick() {
        this.props.onLoginClick({
            name: this.state.name,
            password: this.state.password
        });
    }


    render() {
        
        const { errorMessage,onClose } = this.props
        return (
            <div class="customModal fade show in"  role="dialog">
                    <div class="modal-dialog width-30">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Login, Please</h4>
                                <button type="button" class="close" onClick={onClose}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            </div>
                            <div class="modal-body">
                                {errorMessage &&
                                    <div class="alert alert-danger">
                                        <p>{errorMessage}</p>
                                    </div>}
                                <div class="form-group">
                                    <label for='name' class="sr-only">Email</label>
                                    <input type='text' name='name' placeholder='Your login' className="form-control" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div class="form-group">
                                    <label for="key" class="sr-only">Password</label>
                                    <input type='password' name='password' placeholder='password' className="form-control" value={this.state.password} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.handleClick} className="btn btn-custom btn-lg btn-block">Login</button>
                                <button type="button" class="btn btn-default" onClick={onClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

Login.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
}