import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updObj, checkValidity } from '../../../shared/utility';
// import { stat } from 'fs';



class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'E-mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Express One'},
                            {value: 'balanced', displayValue: 'Eagle Courier'},
                            {value: 'slowest', displayValue: 'National'}
                        ]
                    },
                    value: 'balanced',
                    validation: {},
                    valid: true
                },
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // // alert('You have selected continue.')
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            cost: this.props.cost,
            orderData: formData,
            userId: this.props.userId
        }
       
        this.props.onTortillaOrder(order, this.props.token);
        
    }  

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updObj(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updObj(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });


        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){
        const formELementsArray = [];
        for (let key in this.state.orderForm){
            formELementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formELementsArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value} 
                           invalid={!formElement.config.valid}
                           shouldValidate={formElement.config.validation}
                           touched={formElement.config.touched}
                           changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button buttonType="Success" disabled={!this.state.formIsValid} >ORDER NOW</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData} >
                <h4>Enter your contact information</h4>
                {form}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.tortillaBuilder.ingredients,
        cost: state.tortillaBuilder.totalCost,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTortillaOrder: (orderData, token) => dispatch(actions.purchaseTortilla(orderData, token)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));