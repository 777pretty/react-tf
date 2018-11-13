import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

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
            <div>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Full Name:" />
                    <input type="email" name="email" placeholder="E-mail:" />
                    <input type="text" name="street" placeholder="Street Name:" />
                    <input type="text" name="postalCode" placeholder="PC:" />
                    <Button buttonType="Success">ORDER NOW</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;
