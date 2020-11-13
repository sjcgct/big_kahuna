import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'



class CategoryNavBar extends Component {
  
  constructor(props){
    super(props)
    var active_map={
      celluloid: "link",
      scitech: "link",
      alumspace: "link",
      openpage: "link",
      tete: "link",
      recent:"link"
    }
    this.state={
      category:props.category,
      active_map:active_map
    }

    active_map[props.category]="active-link"
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

            <a className={this.state.active_map['recent']} href={`/blogs/recent`} > Recent </a>
            <a className={this.state.active_map['openpage']} href={`/blogs/openpage`} > Open Page </a>
            <a className={this.state.active_map['celluloid']} href={`/blogs/celluloid`} > Celluloid </a>
            <a className={this.state.active_map['scitech']} href={`/blogs/scitech`} > Scitech </a>
            <a className={this.state.active_map['alumspace']} href={`/blogs/alumspace`} > Alumspace </a>
            <a className={this.state.active_map['tete']} href={`/blogs/tete`} > Tete </a>

          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default CategoryNavBar
