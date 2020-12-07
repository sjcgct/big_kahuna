/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-inner-declarations */
import { useState, useEffect } from 'react'

// Hook
function useWindowSize () {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  var [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize () {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Call handler right away so state gets updated with initial window size
      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export default function ApertureCard ({ title, url, description }) {
  var fliphtmlLink = 'https://online.fliphtml5.com/'
  var endShot = '/files/shot.jpg'
  var src = fliphtmlLink.concat(url).concat(endShot)
  var data_href = fliphtmlLink.concat(url)
  const size = useWindowSize()

  var screenClass = {}

  if (size.width < 768) {
    screenClass.element = 'd-block d-md-none d-lg-none aperture-img-holder'
    screenClass.high = 250
    screenClass.wide = 400
  } else if (size.width >= 768) {
    screenClass.element = 'd-none d-md-block d-lg-block aperture-img-holder'
    screenClass.high = 500
    screenClass.wide = 900
  }

  return (
    <>
      <div className='col-sm-12 col-md-3'>
        <div className='card aperture-card'>
          <div className={screenClass.element}>
            <img
              className='aperture-img' src={src}
              data-rel='fh5-light-box-demo' data-href={data_href} data-width={screenClass.wide}
              data-height={screenClass.high} data-title={title}
            />
          </div>
          <div className='card-body'>
            <h3 className='card-title aperture-card-title text-center mb-1'>{title}</h3>
            <p className='text-center aperture-card-description'> {description} </p>
          </div>

        </div>
      </div>

    </>

  )
}
