import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'


class CategoryNavBar extends Component {
  
  constructor(props){
    super(props)
  }

  switch(){
  }
  render () {
    return (
      <Navbar className='navbar' expand='lg'>
        <Navbar.Brand>
          <span>Categories</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>

          <Nav className='mx-auto'>
            
            <Link href={`/blogs/recent`}  passHref>
              <Nav.Link>Recent</Nav.Link>
            </Link>

            <Link href={`/blogs/openpage`} passHref>
              <Nav.Link>Open Page</Nav.Link>
            </Link>

            <Link href={`/blogs/celluloid`} passHref>
              <Nav.Link>Celluloid</Nav.Link>
            </Link>

            <Link href={`/blogs/scitech`} passHref>
              <Nav.Link >SciTech</Nav.Link>
            </Link>

            <Link href={`/blogs/alumspace`} passHref>
              <Nav.Link>AlumSpace</Nav.Link>
            </Link>

            <Link href={`/blogs/tete`} passHref>
              <Nav.Link>Tete-a-Tete with Interns</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default CategoryNavBar
