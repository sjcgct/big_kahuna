import '../style/index.css'
import Router from 'next/router'
import Loading from 'react-simple-loading'

export default function App ({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('findished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  return (
    <>
      {loading ? (
        <Loading
          color='firebrick'
          stroke='10px'
          size='100px'
        />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
