import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';



class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'E-mail'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
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
                    value: ''
                },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // // alert('You have selected continue.')
        this.setState({
            loading: true
        })
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            cost: this.props.cost,
            orderData: formData
        }
       
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({
                    loading: false,
                })
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({orderForm: updatedOrderForm});
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
                           changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button buttonType="Success" >ORDER NOW</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData} >
                <h4>Enter your contact information</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
