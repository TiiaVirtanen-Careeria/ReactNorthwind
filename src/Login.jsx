import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser}) => {

// Komponentin tilan määritys
const [userName, setUsername] = useState('')
const [password, setPassword] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var userForAuth = {
        userName: userName,
        password: md5(password) // Salataan md5 kirjaston metodilla
    }
    
    console.log(userForAuth)

    LoginService.authenticate(userForAuth)
    .then(response => {
      if (response.status === 200) {

        // Talletetaan tietoja selaimen local storageen (f12 application välilehti)
        localStorage.setItem("username", response.data.userName)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)

        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser({
          userneme: response.data.userName,
          accesslevelId: response.data.accesslevelId})


        setMessage(`Logged in as: ${userForAuth.userName}`)
        setIsPositive(true)
        setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

    //Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    }

  return (
    <div id="loginWindow">

       <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '10px',  marginLeft: '10px'}}>
                <input id="userName" type="text" value={userName} placeholder="Username"
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div style={{ marginRight: '10px' }}>
                <input id ="password" type="password" value={password} placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            
         <input id="login" style={{ marginRight: '10px' }} type='submit' value='login' />
         <input style={{ marginRight: '10px' }} type='button' value='empty' onClick={() => emptyFields()} />
       </form>

    </div>
  )
}

export default Login