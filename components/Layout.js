/* eslint-disable react/react-in-jsx-scope */

import Footer from './Footer'
import Header from './Header'
import MessengerCustomerChat from 'react-messenger-customer-chat'

const Layout = props => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className='layout'>
      <Header menu={props.menu} />
      <div className='container'>

        <div>
          {props.children}
        </div>
      </div>
      <Footer />
      <MessengerCustomerChat
        pageId='1384942788394818'
        appId='1049032935614467'
        themeColor='#5CDB95'
        minimized={false}
      />
    </div>
  )
}

export default Layout
