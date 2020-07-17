import Footer from './Footer'
import Header from './Header'
const Layout = props => (
  <div className='Layout'>
    <div className='container'>
      <Header />
      <div>
        {props.children}
      </div>
      <Footer />
    </div>
  </div>
)

export default Layout
