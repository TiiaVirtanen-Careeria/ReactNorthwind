import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

// Komponentin tilan määritys

const [userId, setUserId] = useState(muokattavaUser.userId)
const [firstName, setFirstName] = useState(muokattavaUser.firstName)
const [lastName, setLastName] = useState(muokattavaUser.lastName)
const [email, setEmail] = useState(muokattavaUser.email)

const [userName, setUserName] = useState(muokattavaUser.userName)
const [password, setPassword] = useState(muokattavaUser.password)
const [accesslevelId, setAccesslevelId] = useState(muokattavaUser.accesslevelId)


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var editUser = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        password: md5(password),
        accesslevelId: accesslevelId
    }
    
    UserService.update(editUser)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited User: " + editUser.firstName + " " + editUser.lastName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
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
    <div id="edit">
       <h2>User Edit</h2>

       <form onSubmit={handleSubmit}>
       <div>
                <input type="text" value={userId} disabled />
            </div>
            <div>
              <label>Firstname:</label>
            </div>
            <div>
                <input type="text" value={firstName}
                    onChange={({ target }) => setFirstName(target.value)} required />
            </div>
            <div>
              <label>Lastname:</label>
            </div>
            <div>
                <input type="text" value={lastName}
                    onChange={({ target }) => setLastName(target.value)} />
            </div>
            <div>
              <label>Email:</label>
            </div>
            <div>
                <input type="text" value={email}
                    onChange={({ target }) => setEmail(target.value)} />
            </div>
            <div>
              <label>Username:</label>
            </div>
            <div>
                <input type="text" value={userName}
                    onChange={({ target }) => setUserName(target.value)} />
            </div>
            <div>
              <label>Password:</label>
            </div>
            <div>
                <input type="text" value={password}
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            <div>
              <label>AccesslevelId:</label>
            </div>
            <div>
                <input type="text" value={accesslevelId}
                    onChange={({ target }) => setAccesslevelId(target.value)} />
            </div>
         
         <input style={{ margin: '8px' }} type='submit' value='save' />
         <input style={{ margin: '8px' }} type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default UserEdit