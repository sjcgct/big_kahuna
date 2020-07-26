export default function RecentBlogs () {
  return (
  // <div className='container'>
  //   <div className='card-coloumns blog-zone row mt-5'>
  //     <BlogPostGrid />
  //     <BlogPostGrid />
  //     <BlogPostGrid />
  //     <BlogPostGrid />
  //     <BlogPostGrid />
  //     <BlogPostGrid />
  //     <BlogPostGrid />
  //     <BlogPostGrid />
  //     <BlogPostGrid />

  //   </div>
  // </div>

    <PinterestGrid />
  )
}

const BlogPostGrid = () => {
  return (
  // <div className='col-sm-12 col-md-4 mt-5'>
  //   <div>
  //     <img src='https://source.unsplash.com/random/6000*4000' className='card-img' />
  //   </div>
  // </div>

  // <div className="col-sm-12 col-md-4 mt-5 card">
  //     <img className="card-img-top" src='https://source.unsplash.com/random/6000*4000' alt="Card image cap"/>
  //     <div className="card-body">
  //     <h5 className="card-title">HOG Title</h5>
  //     <p className="card-text">Hi i am famous fooker.. in gct</p>
  //     <a href="#" className="btn btn-primary">Go somewhere</a>
  //     </div>
  // </div>
    <div className='card-deck '>
      <div className='card col-sm-12 col-md-4 mt-5' />
      <img className='card-img-top' src='https://source.unsplash.com/random/6000*4000' alt='Card image cap' />
      <div className='card-body'>
        <h5 className='card-title'>Card title</h5>
        <p className='card-text'>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <div className='card-footer'>
        <small className='text-muted'>Read</small>
      </div>
    </div>

  )
}

const PinterestGrid = () => {
  return (

    <div className='card-deck'>
      <div className='card mb-4 border-0'>
        <div className='card-body '>
          <h5 className='card-title'>Card title that wraps to a new line bla bla bla blabla blabla blabla blabla blabla blabla blabla bla</h5>
          <p className='card-text'>This is a longer card with supporting text.</p>
        </div>
        <div className='card-footer'>
          <small className='text-danger'>Read</small>
        </div>
        <img className='card-img-top' src='https://source.unsplash.com/random/6000*4000' alt='Card image cap' />
      </div>
      <div className='card mb-4 border-0'>
        <div className='card-body'>
          <h5 className='card-title'>Card title that wraps to a new line</h5>
          <p className='card-text'>This is a longer card with supporting text.</p>
        </div>
        <div className='card-footer'>
          <small className='text-danger'>Read</small>
        </div>
        <img className='card-img-top' src='https://source.unsplash.com/random/6000*4000' alt='Card image cap' />
      </div>
      <div className='card mb-4 border-0'>
        <div className='card-body'>
          <h5 className='card-title'>Card title</h5>
          <p className='card-text'>This card has supporting text below as a natural lead-in to additional content.</p>
        </div>
        <div className='card-footer'>
          <small className='text-danger'>Read</small>
        </div>
        <img className='card-img-top' src='https://source.unsplash.com/random/6000*4000' alt='Card image cap' />
      </div>
      {/* <div class="card mb-4 border-0">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
        </div>
        <div class="card-footer">
            <small class="text-danger">Read</small>
        </div>
        <img class="card-img-top"  src='https://source.unsplash.com/random/6000*4000' alt="Card image cap"/>
    </div> */}

      {/* <div class="card">
        <img class="card-img-top"  src='https://source.unsplash.com/random/6000*4000' alt="Card image cap"/>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text"><small class="text-muted">Read</small></p>
        </div>
    </div>
    <div class="card">
        <img class="card-img-top"  src='https://source.unsplash.com/random/6000*4000'alt="Card image cap"/>
        <div class="card-body">
            <h5 class="card-title">Card title that wraps to a new line</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
    </div>
    <div class="card">
        <img class="card-img-top"  src='https://source.unsplash.com/random/6000*4000' alt="Card image cap"/>
        <div class="card-body">
            <h5 class="card-title">Card title that wraps to a new line</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
    </div>
    <div class="card">
        <img class="card-img-top"  src='https://source.unsplash.com/random/6000*4000' alt="Card image cap"/>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text"><small class="text-muted">Read</small></p>
        </div>
    </div>

    <div class="card">
        <img class="card-img"  src='https://source.unsplash.com/random/6000*4000'alt="Card image"/>
    </div>
    <div class="card bg-primary text-white text-center p-3">
        <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
            <footer class="blockquote-footer">
                <small>
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
            </footer>
        </blockquote>
    </div> */}
      {/* <div class="card text-center">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text"><small class="text-muted">Read</small></p>
        </div>
    </div>

    <div class="card p-3 text-right">
        <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">
                <small class="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
            </footer>
        </blockquote>
    </div> */}
      {/* <div class="card">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p class="card-text"><small class="text-muted">Read</small></p>
        </div>
    </div> */}
      {/* <div class="card p-3">
        <blockquote class="blockquote mb-0 card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">
                <small class="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
            </footer>
        </blockquote>
    </div> */}
    </div>
  )
}

<script src='responsive_waterfall.js' />
