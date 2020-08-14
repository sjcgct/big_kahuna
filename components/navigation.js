import { Nav, NavDropdown, Navbar, Button, Form, FormControl } from 'react-bootstrap'
import React, { Component } from 'react'

class NavBar extends Component {
  render () {
    return (
      <Navbar className='navue' bg='light' expand='lg'>
        <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/news'>Campus News</Nav.Link>
            <NavDropdown title='Blog' href='/blog' id='basic-nav-dropdown'>
              <Nav.Link href='/news'>Campus News</Nav.Link>
              <NavDropdown.Item href='/openpage'>Open Page</NavDropdown.Item>
              <NavDropdown.Item href='/celluloid'>Celluloid</NavDropdown.Item>
              <NavDropdown.Item href='/hello'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/huehue'>Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='/hog'>Humans of GCT</Nav.Link>
            <Nav.Link href='/podcast'>Podcast</Nav.Link>
            <Nav.Link href='/'>ABC Channel</Nav.Link>
            <Nav.Link href='/'>Aperture</Nav.Link>
            <Nav.Link href='/about'>About Us</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar
