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
        const order = {
            ingredients: this.props.ingredients,
            cost: this.props.cost,
            customer: {
                name: 'Roland Royce',
                address: {
                    street: 'Test street',
                    zipcode: 123456,
                    country: 'Chinese Empire'
                },
                email: 'royce@gmail.com'
            },
            deliveryMethod: 'Express One'
        };
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

    render(){
        const formELementsArray = [];
        for (let key in this.state.orderForm){
            formELementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form>
                {/* <Input elementType="..." elementConfig="..." value="..."/> */}
                {formELementsArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value} />
                ))}
                {/* <Button buttonType="Success" clickd={this.orderHandler} >ORDER NOW</Button> */}
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        } else {form}
        return(
            <div className={classes.ContactData} >
                <h4>Enter your contact information</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
