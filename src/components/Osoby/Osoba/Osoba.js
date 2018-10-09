import React, { Component } from 'react'
import zKlas from './Osoba.css'

class Osoba extends Component {
    render(){
    return   <div className={zKlas.Osoba}>
        <h4>Moje meno je {this.props.meno}.</h4>
        <p onClick={this.props.clique}>Pochadzam z {this.props.lokacia}. A mam {Math.floor(Math.random()*100)} rokov lmao.</p>
        <h1>{this.props.children}</h1>
        <input type='text' 
               onChange={this.props.zmenena} 
               value={this.props.meno} />
    </div>
    }
}



export default Osoba