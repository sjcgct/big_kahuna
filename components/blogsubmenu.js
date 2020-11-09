import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'

class CategoryNavBar extends Component {
  render () {
    return (
      <Navbar className='navbar' expand='lg'>
        <Navbar.Brand>
          <span>Categories</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>

          <Nav className='mx-auto'>
            <Link href='[category]' as={`/blogs/recent`}  passHref>
              <Nav.Link>Recent</Nav.Link>
            </Link>

            <Link href='[category]' as={`/blogs/openpage`} passHref>
              <Nav.Link>Open Page</Nav.Link>
            </Link>

            <Link href='[category]' as={`/blogs/celluloid`} passHref>
              <Nav.Link>Celluloid</Nav.Link>
            </Link>

            <Link href='[category]' as={`/blogs/scitech`} passHref>
              <Nav.Link >SciTech</Nav.Link>
            </Link>

            <Link href='[category]' as={`/blogs/alumspace`} passHref>
              <Nav.Link>AlumSpace</Nav.Link>
            </Link>

            <Link href='[category]' as={`/blogs/tete`} passHref>
              <Nav.Link>Tete-a-Tete with Interns</Nav.Link>
            </Link>
          </Nav>

          {/* <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-success'>Search</Button>
          </Form> */}
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default CategoryNavBar
