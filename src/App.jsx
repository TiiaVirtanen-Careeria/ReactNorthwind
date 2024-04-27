import './App.css'
import React, {useState} from 'react'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Message from './Message'

const App = ()  => {

  //App komponentin tila
const [showLaskuri, setshowLaskuri] = useState(false)
const [showPosts, setshowPosts] = useState(false)
// Statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)

const huomio = () => {
  alert("Huomio!")
}
// Rivillä 19 yksi tapa, tässä toinen tapa {showLaskuri === true ? <Laskuri /> : <button>Näytä</button>}
  return (
    <div>
      <h1>Hello from React</h1>

      {showMessage && <Message message={message} isPositive={isPositive} /> }

      <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />

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
