import React, { Component } from 'react'
import zKlas from './App.css'
import Osoby from '../components/Osoby/Osoby'
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {
  state = {
    osoby: [
      { id: 'qwes', meno: 'Kristof', lokacia: 'Nove Zamky' },
      { id: 'reqs', meno: 'Lucia', lokacia: 'Bratislava' },
      { id: 'qqwe', meno: 'Karol', lokacia: 'Svidnik' }
    ],
    
    ukazOsoby: false
    
  }


  zmen = (event, id) => {
    const osobaIndex = this.state.osoby.findIndex(g => {
      return g.id === id
    })
    const osoba = {
      ...this.state.osoby[osobaIndex]
    }
    osoba.meno = event.target.value
    const osoby = [...this.state.osoby]
    osoby[osobaIndex] = osoba
    this.setState({
      osoby: osoby
    })
  }

  togglniOsobaHandler = () => {
    const ukazuje = this.state.ukazOsoby
    this.setState({ukazOsoby: !ukazuje})
  }

  zmazOsobaHandler = (osobyIndex) => {
    const osoby = [...this.state.osoby]
    osoby.splice(osobyIndex, 1)
    this.setState({osoby: osoby})
  }

  render() {

    let osDis = null

    if (this.state.ukazOsoby){
      osDis = (
        <Osoby osoby={this.state.osoby} 
               clique={this.zmazOsobaHandler} 
               zmenena={this.zmen}/>
      )
    }

    return (
      <div className={zKlas.App}>
        <Cockpit ukazOsoby={this.state.ukazOsoby} 
                 osoby={this.state.osoby} 
                 buttonKlik={this.togglniOsobaHandler}/>
        {osDis}
      </div>
    )
  }
}


export default App