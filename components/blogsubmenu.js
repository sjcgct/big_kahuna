import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'

class CategoryNavBar extends Component {
  constructor (props) {
    super(props)
    var active_map = {
      'celluloid': 'link',
      'scitech': 'link',
      'alumspace': 'link',
      'openpage': 'link',
      'tete': 'link',
      'recent': 'link',
      'campus-pulse':'link'
    }
    this.state = {
      category: props.category,
      active_map: active_map
    }

    active_map[props.category] = 'active-link'
  }

  render () {
    return (
      <Navbar className='navbar' expand='lg'>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>

          <Nav className='mx-auto'>

            <a className={this.state.active_map["recent"]} href='/blogs/recent' aria_label='Recent'> Recent </a>
            <a className={this.state.active_map["openpage"]} href='/blogs/openpage' aria_label='Open Page'> Open Page </a>
            <a className={this.state.active_map["campus-pulse"]} href='/blogs/campus-pulse' aria_label='Campus Pulse'> Campus Pulse </a>
            <a className={this.state.active_map["celluloid"]} href='/blogs/celluloid' aria_label='Celluloid'> Celluloid </a>
            <a className={this.state.active_map["scitech"]} href='/blogs/scitech' aria_label='Scitech'> Scitech </a>
            <a className={this.state.active_map["alumspace"]} href='/blogs/alumspace' aria_label='Alumspace'> Alumspace </a>
            <a className={this.state.active_map["tete"]} href='/blogs/tete' aria_label='Tete'> Tete </a>

          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default CategoryNavBar
