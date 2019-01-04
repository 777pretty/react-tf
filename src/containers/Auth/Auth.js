import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                }, 
                valid: false,
                touched: false
            }
        },
        alreadySigned: false
    }

    componentDidMount() {
        if (!this.props.buildingTortilla && this.props.authRedirectPath !== "/") {
            this.props.onAuthRedirectPathSet();
        }
    }

    checkValidity(value, rules){
        let isValid =  true;
        if (!rules){
            return true;
        }

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updControls});
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.alreadySigned)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {alreadySigned: !prevState.alreadySigned};
        });
    }

    render () {
        const formELementsArray = [];
        for (let key in this.state.controls){
            formELementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = <Spinner />
        if (!this.props.loading){
        form = formELementsArray.map(formElement => (
            <Input  key={formElement.id}elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))} else form = <Spinner />

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.alreadySigned){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.loginHandler}>
                    {form}
                    <Button buttonType="Success">Submit</Button>
                </form>
                <Button 
                    clickd={this.switchAuthModeHandler}
                    buttonType="Danger">{this.state.alreadySigned ? 'SIGN IN' : 'SIGN UP'} INSTEAD</Button>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        alreadySigned: state.auth.token !== null,
        buildingTortilla: state.tortillaBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, alreadySigned) => dispatch(actions.auth(email, password, alreadySigned)),
        onAuthRedirectPathSet: () => dispatch(actions.setAuthRedirectPath("/"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));