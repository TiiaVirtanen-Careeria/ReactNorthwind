import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys
// Id arvo määritellään tietokannassa automaattisesti,
// emme anna sitä itse
const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
const [passwordsMatch, setPasswordsMatch] = useState(true)


// Tarkistetaan salasanojen vastaavuus jokaisen muutoksen yhteydessä
const handlePasswordChange = (event) => {
  const password = event.target.value
    setNewPassword(password)

    // Tarkistetaan, vastaavatko salasanat toisiaan
    setPasswordsMatch(password === newPasswordConfirm);
    }

const handleConfirmPasswordChange = (event) => {
  const confirmPassword = event.target.value
    setNewPasswordConfirm(confirmPassword)

    // Tarkistetaan, vastaavatko salasanat toisiaan
    setPasswordsMatch(confirmPassword === newPassword)
    }

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()

      var newUser = {
        firstName: newFirstname,
        lastName: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        userName: newUsername,
        password: md5(newPassword) // Salataan md5 kirjaston metodilla
    }
    
    console.log(newUser)

    UserService.create(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage(`Added new User: ${newUser.firstName} ${newUser.lastName}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
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


  return (
    <div id="addNew">
       <h2>User add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstname} placeholder="First name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Last name"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccesslevelId} placeholder="Access level"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={ handlePasswordChange } />
            </div>
            <div>
                <input type="password" value={newPasswordConfirm} placeholder="Confirm Password"
                    onChange={ handleConfirmPasswordChange } />
            </div>
            {!passwordsMatch && <p>Passwords do not match</p>}
         <input style={{ margin: '8px' }} type='submit' value='save' />
         <input style={{ margin: '8px' }} type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default UserAdd