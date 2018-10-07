import React, { Component } from 'react'
import zKlas from './App.css'
import Osoba from './Osoba/Osoba'

class App extends Component {
  state = {
    osoby: [
      { id: 'qwes', meno: 'Kristof', lokacia: 'Nove Zamky' },
      { id: 'reqs', meno: 'Lucia', lokacia: 'Bratislava' },
      { id: 'qqwe', meno: 'Karol', lokacia: 'Svidnik' }
    ],
    
    ukazOsoby: false
    
  }


  Zmen = (event, id) => {
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
    const styl = {
      backgroundColor: 'white',
      fontFamily: 'Calibri',
      fontSize: '18px',
      padding: '10px',
      cursor: 'pointer'
    }

    let osDis = null

    if (this.state.ukazOsoby){
      osDis = (
        <div>
        {this.state.osoby.map((g, index) =>
            <Osoba 
            clique={() => this.zmazOsobaHandler(index)}
            meno={g.meno} 
            lokacia={g.lokacia}
            key={g.id}
            zmenena={(event) => this.Zmen(event, g.id)}
            /> 
        )} 

        {/* <Osoba meno={this.state.osoby[2].meno} 
        lokacia={this.state.osoby[2].lokacia} 
        klikz={this.Zmen}
        />
        <br />

        <Osoba meno={this.state.osoby[2].meno} 
        lokacia={this.state.osoby[2].lokacia} 
        klikz={this.Zmen}
        />  */}



        </div>
      )
      styl.backgroundColor = '#EEEEEE'
      styl.color = 'goldenrod'
    }

    const klasik = []
    if (this.state.osoby.length <= 2){
      klasik.push(zKlas.zelik)
    }
    if (this.state.osoby.length <= 1){
      klasik.push(zKlas.hrubik)
    }
    if (this.state.osoby.length <= 0){
      klasik.push(zKlas.velik)
    }

    return (
      <div className={zKlas.App}>
      <br />
        <p className={klasik.join(' ')}>fungujem</p>
        <button onClick={this.togglniOsobaHandler} style={styl}>Stlac!</button>
        <br />
        <br />
        {osDis}
      </div>
    )
  }
}


export default App