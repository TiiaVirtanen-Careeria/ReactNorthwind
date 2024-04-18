import './App.css'
import React, {useState} from 'react'
import Laskuri from './Laskuri'
import Viesti from './Viesti'

const App = ()  => {

  //App komponentin tila
const [showLaskuri, setshowLaskuri] = useState(false)

const huomio = () => {
  alert("Huomio!")
}
// Rivillä 19 yksi tapa, tässä toinen tapa {showLaskuri === true ? <Laskuri /> : <button>Näytä</button>}
  return (
    <div>
      <h1>Hello from React</h1>

      {showLaskuri && <Laskuri huomio={huomio} />}

      {showLaskuri && <button onClick={() => setshowLaskuri(!showLaskuri)}>Piilota laskuri</button>}
      {!showLaskuri && <button onClick={() => setshowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

      <Viesti teksti="Tervehdys app komponentista" />
    </div>
  )
}

export default App
