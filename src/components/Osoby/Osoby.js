import React, { Component } from 'react'

import Osoba from './Osoba/Osoba'

class Osoby extends Component {
    render(){
    return  this.props.osoby.map((g, index) => {
        return <Osoba 
        clique={() => this.props.clique(index)}
        meno={g.meno} 
        lokacia={g.lokacia}
        key={g.id}
        zmenena={(event) => this.props.zmenena(event, g.id)}
        /> 
}) } 
}


export default Osoby