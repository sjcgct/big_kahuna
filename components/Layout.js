/* eslint-disable react/react-in-jsx-scope */

import Footer from './Footer'
import Header from './Header'
const Layout = props => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className='layout'>
      <Header menu={props.menu}/>
      <div className='container'>

        <div>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
