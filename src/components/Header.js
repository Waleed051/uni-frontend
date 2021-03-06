import React from 'react'
import {Navbar, Nav,Container, Row, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch,useSelector} from 'react-redux'
import {logout} from '../actions/userActions'
const Header = () => {
  const dispatch=useDispatch()
  const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo} = userLogin
    const logoutHandler=()=>{
      dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
  <Container>
    <LinkContainer to='/'>
    <Navbar.Brand>Proshop</Navbar.Brand>
    </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
    <LinkContainer to='/cart'>
      <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
    </LinkContainer>
    {userInfo?
    <NavDropdown title={userInfo.name} id='user'>
      <LinkContainer to='/profile'>
        <NavDropdown.Item>
          Profile
        </NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item>
          Logout
      </NavDropdown.Item>
    </NavDropdown>
    :
    <LinkContainer to='/login'>
      <Nav.Link><i className='fas fa-shopping-cart'></i>Signin</Nav.Link>
    </LinkContainer>
    }
    
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
