import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'



class CategoryNavBar extends Component {
  
  constructor(props){
    super(props)
    var active_map={
      celluloid: false,
      scitech: false,
      alumspace: false,
      openpage: false,
      tete: false
    }
    this.state={
      category:props.category,
      active_map:active_map
    }

    active_map[props.category]=true
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
              <Nav.Link active={this.state.active_map['recent']}>Recent</Nav.Link>
            </Link>

            <Link href={`/blogs/openpage`} passHref>
              <Nav.Link active={this.state.active_map['openpage']}>Open Page</Nav.Link>
            </Link>

            <Link href={`/blogs/celluloid`} passHref>
              <Nav.Link active={this.state.active_map['celluloid']}>Celluloid</Nav.Link>
            </Link>

            <Link href={`/blogs/scitech`} passHref>
              <Nav.Link active={this.state.active_map['scitech']}>SciTech</Nav.Link>
            </Link>

            <Link href={`/blogs/alumspace`} passHref>
              <Nav.Link active={this.state.active_map['alumspace']}>AlumSpace</Nav.Link>
            </Link>

            <Link href={`/blogs/tete`} passHref>
              <Nav.Link active={this.state.active_map['tete']}>Tete-a-Tete with Interns</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default CategoryNavBar
