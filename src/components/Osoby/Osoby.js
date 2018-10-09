import React, { Component } from 'react'

import Osoba from './Osoba/Osoba'

class Osoby extends Component {
    componentWillMount(){
        console.log('SCOOP SCOOP xx in component will mount')
      }
      componentDidMount(){
        console.log('scupity xx in component did mount')
      }
    render(){
        console.log('SCOOOOPITYYYYYYYYYYYYYYYYYYYYY')
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