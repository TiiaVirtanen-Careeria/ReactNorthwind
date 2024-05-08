import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setIsPositive, setShowMessage, setMessage, loggedInUser})  => {

    // Komponentin tilan määritys
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkausstila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {
    UserService.getAll()
    .then(data => {
        setUsers(data)
    })
},[lisäystila, reload, muokkausstila]
)

//Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editUser = (user) => {
    setMuokattavaUser(user)
    setMuokkaustila(true)
}

const deleteUser = (user) => {
    let vastaus = window.confirm(`Remove User ${user.firstName}`)

    if (vastaus === true) {
    UserService.remove(user.userId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed user ${user.firstName}`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
        reloadNow(!reload)
        }
        
            }
        )
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })

    } // Jos poisto halutaankin perua
    else {
    setMessage('Poisto peruttu onnistuneesti.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
    }
}

const HomeButton = () => {
    window.location.href = '/'
}

if (localStorage.getItem("accesslevelId") === "1") {
    return (
        <>
            <h2>
                <nobr>Users</nobr>
                {lisäystila && (
                    <UserAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive}
                    setMessage={setMessage} setShowMessage={setShowMessage}/>)}
    
                {!lisäystila && (
                    <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>)}
            </h2>
    
            {!lisäystila && !muokkausstila && (
                <input placeholder="Search by lastname" value={search}
                onChange={handleSearchInputChange}/>)}
    
            {muokkausstila && (
                <UserEdit setMuokkaustila={setMuokkaustila} setIsPositive={setIsPositive}
                setMessage={setMessage} setShowMessage={setShowMessage} muokattavaUser={muokattavaUser}/>)}
            
            <table id="userTable">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Accesslevel</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!lisäystila && !muokkausstila && users && users.map(u => {
                            const lowerCaseName = u.lastName.toLowerCase();
                            if (lowerCaseName.indexOf(search) > -1) {
                                return (
                                    <tr key={u.userId}>
                                        <td>{u.firstName}</td>
                                        <td>{u.lastName}</td>
                                        <td>{u.email}</td>
                                        <td>{u.accesslevelId}</td>
                                        <td>
                                            <button className="nappi2" onClick={() => editUser(u)}>
                                                Edit
                                            </button>
                                            <button className="nappi2" onClick={() => deleteUser(u)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                </tbody>
            </table>
        </>
    )
} else {
    return (
    <div>
        <p id='noAccess'>No access!<br></br></p>
        <button className='nappi2' onClick={HomeButton}>to the front page</button>
    </div>
    )
}

}

export default UserList