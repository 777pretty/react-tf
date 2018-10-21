import React, { Component } from 'react';

import Aukz from '../../hoc/Aukz';
import Tortilla from '../../components/Tortilla/Tortilla';

class TortillaBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 2,
            bacon: 0,
            cheese: 1,
            meat: 1
        }
    }

    render () {
        return (
            <Aukz>
                <Tortilla ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Aukz>
        );
    }
}

export default TortillaBuilder;