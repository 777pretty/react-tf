import React, { Component } from 'react'

import classes from './Modal.css'
import Aukz from '../../../hoc/Aukz/Aukz'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

        shouldComponentUpdate(nextProps, nextState){
                return nextProps.disp !== this.props.disp || nextProps.children !== this.props.children
        }

        componentWillUpdate(){
                return console.log('[Modal] WillUpdate')
        }

        render(){


        return(
        <Aukz>
        <Backdrop disp={this.props.disp} cliked={this.props.modalOut}/>
        <div className={classes.Modal} 
                style={{transform: this.props.disp ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.disp ?'1':'0'}}>
                        {this.props.children}    
        </div>
        </Aukz>
        )
   }
}

export default Modal