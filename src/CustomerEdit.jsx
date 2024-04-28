import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'

const CustomerEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer}) => {

// Komponentin tilan määritys

const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
const [newFax, setNewFax] = useState(muokattavaCustomer.fax)


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newCustomer = {
        customerId: newCustomerId,
        companyName: newCompanyName,
        contactName: newContactName,
        contactTitle: newContactTitle,
        country: newCountry,
        address: newAddress,
        city: newCity,
        postalCode: newPostalCode,
        phone: newPhone,
        fax: newFax
    }
    
    CustomerService.update(newCustomer)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited Customer: " + newCustomer.companyName)
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
       <h2>Customer Edit</h2>

       <form onSubmit={handleSubmit}>
       <div>
                <input type="text" value={newCustomerId} disabled />
            </div>
            <div>
                <label>Company name: </label>
                <input type="text" value={newCompanyName}
                    onChange={({ target }) => setNewCompanyName(target.value)} required />
            </div>
            <div>
              <label>Contact name: </label>
                <input type="text" value={newContactName}
                    onChange={({ target }) => setNewContactName(target.value)} />
            </div>
            <div>
                <label>Contact title: </label>
                <input type="text" value={newContactTitle}
                    onChange={({ target }) => setNewContactTitle(target.value)} />
            </div>
            <div>
                <label>Country: </label>
                <input type="text" value={newCountry}
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <label>Address: </label>
                <input type="text" value={newAddress}
                    onChange={({ target }) => setNewAddress(target.value)} />
            </div>
            <div>
            <label>City: </label>
                <input type="text" value={newCity}
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            <div>
            <label>Postal code: </label>
                <input type="text" value={newPostalCode}
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>
            <div>
            <label>Phone: </label>
                <input type="text" value={newPhone}
                    onChange={({ target }) => setNewPhone(target.value)} />
            </div>
            <div>
            <label>Fax: </label>
                <input type="text" value={newFax}
                    onChange={({ target }) => setNewFax(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default CustomerEdit