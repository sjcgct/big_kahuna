import PodcastEmbed from './embed'

const PodcastList = ({ podcasts }) => {
  var PodcastEpisodes = []
  for (var i = 0; i < podcasts.length; i++) {
    var podcast = podcasts[i].node
    PodcastEpisodes[i] = <PodcastEmbed url={jfnd} />
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 mt-1 mb-1'>
          <iframe src='https://anchor.fm/sjcgct/embed/episodes/Psych-ei68f2' height='auto' width='100%' frameborder='0' scrolling='no' />
        </div>
        <div className='col-sm-12 mt-5 mb-1'>
          <iframe src='https://anchor.fm/sjcgct/embed/episodes/Need-for-an-array-with-dynamic-array-ei668i' height='auto' width='100%' frameborder='0' scrolling='no' />
        </div>
      </div>
    </div>
  )
}
