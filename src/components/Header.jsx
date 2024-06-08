import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../contexts/ContextShare';

function Header({Dashboard}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)

  const navigate = useNavigate()
  const handleLogout = ()=>{


    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')

    setIsAuthToken(false)

 
  }
  return (
    <div>


<Navbar  style={{backgroundColor:"rgb(18, 35, 52)"}}>
        <Container>
          <Navbar.Brand href="./" style={{color:'white',fontSize:'30px',fontWeight:'bold'}}>
          <i class="fa-solid fa-diagram-project"></i>
          Project Fair
         
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {
            Dashboard&&
            <button className='btn btn-outline-danger text-light' onClick={handleLogout}><i class="fa-solid fa-power-off"></i> Logout</button>
          }
          
          </Nav>
        </Navbar.Collapse>



        
        </Container>
      </Navbar>
    </div>
  )
}

export default Header