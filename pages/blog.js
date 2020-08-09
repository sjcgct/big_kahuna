// import Head from 'next/head'
// import Deck from '../components/deck'
 //import { getAllBlogsForHome } from '../prismic-configuration'
// import Layout from '../components/Layout'
// import Footer from '../components/Footer'

// var cursor = ''
// var isNextPageExists = false


// export async function getServerSideProps ({ preview = false, previewData }) {
//     var allBlogs = await getAllBlogsForHome(previewData, cursor, 12)
//     cursor=allBlogs.pageInfo.endCursor
//     allBlogs=allBlogs.edges
//     return {
//       props: { preview, allBlogs,previewData }
//     }
//   }

// const blogPage = ({ preview, allBlogs}) => {
//   return (
//     <Layout>
//       <Head>
//         <title>Student Council - GCT</title>
//       </Head>
//       <h1>
//           Blogs
//       </h1>
//         <Deck cards={allBlogs} type='blog'/>
//     </Layout>
//   )
// }

// export default blogPage

// export async function getServerSideProps ({ preview = false, previewData }) {
//   var allBlogs = await getAllBlogsForHome(previewData, cursor, 12)
//   allBlogs = allBlogs.edges
//   return {
//     props: { preview, allBlogs }
//   }
// }

import React, { Component } from "react";
import { getAllBlogsForHome} from '../prismic-configuration'
import Pagination from "react-js-pagination";
import Layout from '../components/Layout'
import Deck from '../components/deck' 
import { Redirect } from 'react-dom'




class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      blogs:props.blogs,
      rediret:false,
      cursor:props.cursor
    };
  }

  async loadNextPage(pageno){
    const posts=await getAllBlogsForHome(" ",6)
    var blogs=posts.edges
    var cursor=posts.pageInfo.endCursor
    this.setState({blogs:blogs,cursor:cursor,pageNumber:pageno})
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    //this.renderRedirect()
    //this.loadNextPage(pageNumber)
    this.setState({activePage: pageNumber});
  }

  render() {
    return (
     
        <Layout>
           {this.state.blogs && (
        <Deck
          cards={this.state.blogs}
          type='blog'
        />
      )}

        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
        </Layout>

    );
  }
}


export default BlogPage

export async function getServerSideProps({params,previewData}) {
  console.log("loading");
  
  const posts=await getAllBlogsForHome(" ",6)
  var blogs=posts.edges
  var cursor=posts.pageInfo.endCursor
  return {
    props: {blogs,cursor}
  }
}

