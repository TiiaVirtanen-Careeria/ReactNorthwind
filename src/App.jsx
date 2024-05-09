import './App.css'
import React, {useState, useEffect} from 'react'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import EmployeeList from './EmployeeList'
import ProductList from './ProductList'
import UserList from './UserList'
import Message from './Message'
import Login from './Login'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = ()  => {

//App komponentin tila
const [showLaskuri, setshowLaskuri] = useState(false)
const [showPosts, setshowPosts] = useState(false)
// Statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedInUser, setLoggedInUser] = useState('')

useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
},[])

//Log out napin tapahtumakäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}

  return (
    <div className="App">
      

      <Router>
        <Navbar bg="dark" variant="dark">
          <Nav className="me-auto">
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/posts'>Some highlights</Nav.Link>
              <Nav.Link href='/customers'>Customers</Nav.Link>
              <Nav.Link href='/employees'>Employees</Nav.Link>
              <Nav.Link href='/products'>Products</Nav.Link>
              <Nav.Link href='/users'>Users</Nav.Link>
              <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
              {loggedInUser && <button style={{ marginRight: '10px' }} onClick={() => logout()}>Logout</button>}
          </Nav>
          {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive}
      setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser}/>}
        </Navbar>
                    
        <h1>Northwind Corporation</h1>

      {showMessage && <Message message={message} isPositive={isPositive} />}

      <Routes>
        <Route path="/customers"
        element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
        setShowMessage={setShowMessage} />}>
        </Route>

        <Route path="/employees"
        element={<EmployeeList setMessage={setMessage} setIsPositive={setIsPositive} 
        setShowMessage={setShowMessage} />}>
        </Route>

        <Route path="/products"
        element={<ProductList setMessage={setMessage} setIsPositive={setIsPositive} 
        setShowMessage={setShowMessage} />}>
        </Route>

        <Route path="/users"
          element={<UserList setMessage={setMessage} setIsPositive={setIsPositive} 
          setShowMessage={setShowMessage} loggedInUser={loggedInUser} />}>
        </Route>

        <Route path="/posts"
        element={<Posts />}>
        </Route>
        
        <Route path="/laskuri" 
        element={<Laskuri />}>
        </Route>
      </Routes>
    </Router>
  
  </div>
  )
}

export default App
