import React from 'react'

const zklasou = (ObalenyKomponent, nazovKlasy) => {
    return (props) => (
    <div className={nazovKlasy}>
        <ObalenyKomponent {...props} />
    </div>
    )
}

export default zklasou