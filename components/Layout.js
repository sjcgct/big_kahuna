
import Footer from './Footer'
import Header from './Header'
const Layout = props => {
  return (
    <div className='Layout'>
      <div className='container'>
        <Header />
        <div>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
