import React from 'react'

import Osoba from './Osoba/Osoba'

const osoby = (props) => 
    props.osoby.map((g, index) => {
            return <Osoba 
            clique={() => props.clique(index)}
            meno={g.meno} 
            lokacia={g.lokacia}
            key={g.id}
            zmenena={(event) => props.zmenena(event, g.id)}
            /> 
}) 

export default osoby