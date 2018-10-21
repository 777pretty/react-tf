import React from 'react'

import classes from './Modal.css'

const modal = (props) => {
   return <div className={classes.Modal} 
               style={{transform: props.disp ? 'translateY(0)' : 'translateY(-100vh)',
                       opacity: props.disp ?'1':'0'}}>
                {props.children}
          </div>
}

export default modal