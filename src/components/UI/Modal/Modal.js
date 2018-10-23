import React from 'react'

import classes from './Modal.css'
import Aukz from '../../../hoc/Aukz'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
   
   <Aukz>
   <Backdrop disp={props.disp} cliked={props.modalOut}/>
   <div className={classes.Modal} 
               style={{transform: props.disp ? 'translateY(0)' : 'translateY(-100vh)',
                       opacity: props.disp ?'1':'0'}}>
                {props.children}    
   </div>
   </Aukz>
)

export default modal