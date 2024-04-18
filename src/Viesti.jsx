import './App.css'
import React from 'react'

// Jos komponentin ainut tehtävä on palauttaa jtn ruudulle 
const Viesti = (props)  => (
    <>
        <p>{props.teksti}</p>
    </>
  )
export default Viesti