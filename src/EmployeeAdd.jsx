import './App.css'
import React, {useState} from 'react'
import EmployeeService from './services/Employee'

const EmployeeAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys

const [newFirstName, setNewFirstName] = useState('')
const [newLastName, setNewLastName] = useState('')
const [newTitle, setNewTitle] = useState('')
const [newHireDate, setNewHireDate] = useState('')

const [newPostalCode, setNewPostalCode] = useState('')
const [newCity, setNewCity] = useState('')
const [newCountry, setNewCountry] = useState('')
const [newHomePhone, setNewHomePhone] = useState('')

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newEmployee = {
        firstName: newFirstName,
        lastName: newLastName,
        title: newTitle,
        hireDate: newHireDate,
        postalCode: newPostalCode,
        city: newCity,
        country: newCountry,
        homePhone: newHomePhone
    }

    EmployeeService.create(newEmployee)
    .then(response => {
      if (response.status === 200) {
       setMessage("Added new Employee: " + newEmployee.firstName + " " + newEmployee.lastName)
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
       <h2>Employee add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstName} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastName} placeholder="Lastname"
                    onChange={({ target }) => setNewLastName(target.value)} />
            </div>
            <div>
                <input type="text" value={newTitle} placeholder="Title"
                    onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                <input type="date" value={newHireDate} placeholder="HireDate"
                    onChange={({ target }) => setNewHireDate(target.value)} />
            </div>
            <div>
                <input type="text" value={newPostalCode} placeholder="Postal code"
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>
            <div>
                <input type="text" value={newCity} placeholder="City"
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            <div>
                <input type="text" value={newCountry} placeholder="Country"
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <input type="text" value={newHomePhone} placeholder="Home phone"
                    onChange={({ target }) => setNewHomePhone(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default EmployeeAdd