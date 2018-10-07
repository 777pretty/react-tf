import React from 'react'
import Radium from 'radium'
import './Osoba.css'

const osoba = (props) => {
    const styl = {
        '@media (min-width: 500px)': {
            width: '550px'
        }
    }
    return (
    <div className='Osoba' style={styl}>
        <h4>Moje meno je {props.meno}.</h4>
        <p onClick={props.clique}>Pochadzam z {props.lokacia}. A mam {Math.floor(Math.random()*100)} rokov lmao.</p>
        <h1>{props.children}</h1>
        <input type='text' onChange={props.zmenena} value={props.meno} />
    </div>
    )
}

export default Radium(osoba)