export default function RecentBlogs () {
  return (
    <div className='container'>
      <div className='blog-zone row mt-5'>
        <BlogPostGrid />
        <BlogPostGrid />
        <BlogPostGrid />
        <BlogPostGrid />
        <BlogPostGrid />
        <BlogPostGrid />
      </div>
    </div>
  )
}

const BlogPostGrid = () => {
  return (
    <div className='col-sm-12 col-md-4 mt-5'>
      <h1>Aj</h1>
      <div>
        <p>hi</p>
      </div>
    </div>
  )
}
