import React from 'react';

import './Osoba.css';

const osoba = (props) => {
    return (
    <div className='Osoba'>
        <h4>Moje meno je {props.meno}.</h4>
        <p onClick={props.clique}>Pochadzam z {props.lokacia}. A mam {Math.floor(Math.random()*100)} rokov lmao.</p>
        <h1>{props.children}</h1>
        <input type='text' onChange={props.zmenena} value={props.meno} />
    </div>
    )
}

export default osoba