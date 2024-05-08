import './App.css'
import React, {useState} from 'react'
import EmployeeService from './services/Employee'

const EmployeeEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaEmployee}) => {

// Komponentin tilan määritys

const [newEmployeeId, setNewEmployeeId] = useState(muokattavaEmployee.employeeId)
const [newFirstName, setNewFirstName] = useState(muokattavaEmployee.firstName)
const [newLastName, setNewLastName] = useState(muokattavaEmployee.lastName)
const [newTitle, setNewTitle] = useState(muokattavaEmployee.title)
const [newHireDate, setNewHireDate] = useState(muokattavaEmployee.hireDate)

const [newPostalCode, setNewPostalCode] = useState(muokattavaEmployee.postalCode)
const [newCity, setNewCity] = useState(muokattavaEmployee.city)
const [newCountry, setNewCountry] = useState(muokattavaEmployee.country)
const [newHomePhone, setNewHomePhone] = useState(muokattavaEmployee.homePhone)


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newEmployee = {
        employeeId: newEmployeeId,
        firstName: newFirstName,
        lastName: newLastName,
        title: newTitle,
        hireDate: newHireDate,
        postalCode: newPostalCode,
        city: newCity,
        country: newCountry,
        homePhone: newHomePhone
    }
    
    EmployeeService.update(newEmployee)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited Employee: " + newEmployee.firstName + " " + newEmployee.lastName)
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
       <h2>Employee Edit</h2>

       <form onSubmit={handleSubmit}>
       <div>
                <input type="text" value={newEmployeeId} disabled />
            </div>
            <div>
                <label>Firstname: </label>
                <input type="text" value={newFirstName}
                    onChange={({ target }) => setNewFirstName(target.value)} required />
            </div>
            <div>
              <label>Lastname: </label>
                <input type="text" value={newLastName}
                    onChange={({ target }) => setNewLastName(target.value)} />
            </div>
            <div>
                <label>Title: </label>
                <input type="text" value={newTitle}
                    onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                <label>HireDate: </label>
                <input type="date" value={newHireDate}
                    onChange={({ target }) => setNewHireDate(target.value)} />
            </div>
            <div>
                <label>Postal code: </label>
                <input type="text" value={newPostalCode}
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>
            <div>
                <label>City: </label>
                <input type="text" value={newCity}
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            <div>
                <label>Country: </label>
                <input type="text" value={newCountry}
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <label>Home phone: </label>
                <input type="text" value={newHomePhone}
                    onChange={({ target }) => setNewHomePhone(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default EmployeeEdit