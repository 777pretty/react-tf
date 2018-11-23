import React from 'react';

import classes from './Input.css'

const input = (props) => {
    let inputElement = null;

    switch (props.elementType){
        case ('input'):
            inputElement = <input className={classes.Input} {...props.elementConfig} value={props.value} onChange={props.elementConfig}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.Input} {...props.elementConfig} value={props.value} onChange={props.elementConfig}/>;
            break;
        case ('select'):
            inputElement = (
                <select className={classes.InputElement} value={props.value} onChange={props.elementConfig}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={classes.Input} {...props.elementConfig} value={props.value} onChange={props.elementConfig}/>;
    }

    return(
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
    }

export default input;