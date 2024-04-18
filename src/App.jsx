import './App.css'
import React, {useState} from 'react'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'

const App = ()  => {

  //App komponentin tila
const [showLaskuri, setshowLaskuri] = useState(false)
const [showPosts, setshowPosts] = useState(false)

const huomio = () => {
  alert("Huomio!")
}
// Rivillä 19 yksi tapa, tässä toinen tapa {showLaskuri === true ? <Laskuri /> : <button>Näytä</button>}
  return (
    <div>
      <h1>Hello from React</h1>

      {showPosts && <button onClick={() => setshowPosts(!showPosts)}>Piilota postaukset</button>}
      {!showPosts && <button onClick={() => setshowPosts(!showPosts)}>Näytä postaukset</button>}

      {showLaskuri && <button onClick={() => setshowLaskuri(!showLaskuri)}>Piilota laskuri</button>}
      {!showLaskuri && <button onClick={() => setshowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

      {showLaskuri && <Laskuri huomio={huomio} />}
      {showPosts && <Posts />}

      <Viesti teksti="Tervehdys app komponentista" />
    </div>
  )
}

export default App
