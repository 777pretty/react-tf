import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render(){
        return(
            <div className={classes.ContactData} >
                <h4>Enter your contact information</h4>
                <form >
                    <input className={classes.Input} type="email" name="email" placeholder="E-mail:" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street Name:" />
                    <input className={classes.Input} type="text" name="postalCode" placeholder="PC:" />
                    <input className={classes.Input} type="text" name="name" placeholder="Full Name:" />
                    <Button buttonType="Success">ORDER NOW</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;
