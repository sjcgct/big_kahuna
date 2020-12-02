import React, { useState } from 'react'
import NavBar from './navigation'
const Header = (props) => (
  <div className='nav-bg'>
    <NavBar menu={props.menu} logo={props.logo}/>
  </div>

)
export default Header
