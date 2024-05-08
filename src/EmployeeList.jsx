import './App.css'
import React, {useState, useEffect} from 'react'
import EmployeeService from './services/Employee'
import Employee from './Employee'
import EmployeeAdd from './EmployeeAdd'
import EmployeeEdit from './EmployeeEdit'

const EmployeeList = ({setIsPositive, setShowMessage, setMessage})  => {

    // Komponentin tilan määritys
const [employees, setEmployees] = useState([])
const [showEmployees, setShowEmployees] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkausstila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaEmployee, setMuokattavaEmployee] = useState(false)
const [search, setSearch] = useState("")


useEffect(() => {
    EmployeeService.getAll()
    .then(data => {
        setEmployees(data)
    })
},[lisäystila, reload, muokkausstila]
)

//Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setShowEmployees(true)
    setSearch(event.target.value.toLowerCase())
}

const editEmployee = (employee) => {
    setMuokattavaEmployee(employee)
    setMuokkaustila(true)
}

  return (
    <>
        <h2><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowEmployees(!showEmployees)}>Employees</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h2>

                {!lisäystila && !muokkausstila &&
                <input placeholder="Search by last name" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <EmployeeAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}

                {muokkausstila && <EmployeeEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaEmployee={muokattavaEmployee}
                />}


        {
            !lisäystila && !muokkausstila && showEmployees && employees && employees.map(e => 
                {
                    const lowerCaseName = e.lastName.toLowerCase()
                if (lowerCaseName.indexOf(search) > -1) {
                    return (
                        <Employee key={e.employeeId} employee={e} reloadNow={reloadNow} reload={reload}
                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                        editEmployee={editEmployee} />
                    )
                }
                }
            )
        }
    </>
  )
}

export default EmployeeList