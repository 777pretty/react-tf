import React, { Component } from 'react';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
        }
    }

    render () {
        const formELementsArray = [];
        for (let key in this.state.controls){
            formELementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formELementsArray.map(formElement => (
            <Input  key={formElement.id}elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));

        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button buttonType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

export default Auth