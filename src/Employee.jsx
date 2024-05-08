import './App.css'
import React, {useState} from 'react'
import EmployeeService from './services/Employee'

// props on nimeltään product
const Employee = ({employee, editEmployee, setIsPositive, setMessage, setShowMessage, reload, reloadNow})  => {

    // Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteEmployee = (product) => {
    let vastaus = window.confirm(`Remove Employee ${employee.firstName} + ${employee.lastName}`)

    if (vastaus === true) {
    EmployeeService.remove(employee.employeeId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed employee ${employee.firstName} + ${employee.lastName}`)
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

  return (
    <div className='customerDiv'>
        <h4><nobr style={{ cursor: 'pointer' }} onClick={() => setShowDetails(!showDetails)}>{employee.firstName + " " + employee.lastName}</nobr></h4>

        {showDetails && <div className="customerDetails">
            <h4>{employee.firstName + " " + employee.lastName}</h4>
            <button className='nappi2' onClick={() => editEmployee(employee)}>Edit</button>
            <button className='nappi2' onClick={() => deleteEmployee(employee)}>Delete</button>
                <table>
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Title</th>
                            <th>HireDate</th>
                            <th>Country</th>
                            <th>HomePhone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.title}</td>
                            <td>{employee.hireDate}</td>
                            <td>{employee.country}</td>
                            <td>{employee.homePhone}</td>
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default Employee