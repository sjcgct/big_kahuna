import ContentLoader, { Facebook } from 'react-content-loader'

const MyFacebookLoader = () => <Facebook />

const ThreeDots = props => (
    <ContentLoader 
      viewBox="0 0 1010 666"
      height={666}
      width={1010}
      speed={2}
      backgroundColor="transparent"
      {...props}
    >
    <circle cx="450" cy="333" r="8" />
    <circle cx="505" cy="333" r="8" />
    <circle cx="560" cy="333" r="8" />
    </ContentLoader>
  )
  
  export default ThreeDots



