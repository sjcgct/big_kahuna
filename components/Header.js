import React, { useState } from 'react'
import NavBar from './navigation'
const Header = (props) => (
  <div className='nav-bg'>
    <NavBar menu={props.menu} />
  </div>

)
export default Header
