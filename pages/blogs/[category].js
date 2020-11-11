import React, { Component } from 'react'
import { getAllBlogsForHome } from '../../prismic-configuration'
import { getCategoryIdByName, getBlogsWithSameCategory } from '../../prismic-configuration'
import { queryBlogsWithSameCategory } from '../../blog-api'
import { queryAllBlogsForHome } from '../../blog-api'
import Layout from '../../components/Layout'
import CategoryNavBar from '../../components/blogsubmenu'
import Deck from '../../components/deck'
import { PrismicLink } from 'apollo-link-prismic'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import LoaderDeck from '../../components/loaders/loaderDeck'

var name_map={
  celluloid: 'Celluloid',
  scitech: 'SciTech',
  alumspace: 'AlumSpace',
  openpage: 'Open Page',
  tete: 'Tete-a-Tete with Interns' 
}



const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://sjcgctrepo.prismic.io/graphql',
    accessToken: process.env.PRISMIC_TOKEN
  }),
  cache: new InMemoryCache()
})

class BlogPage extends Component {
  
  constructor (props) {
    super(props)
    var page_arr = []
    page_arr[0] = props.cursor
    
    this.state = {
      categoryId:props.categoryId,
      activePage: 0,
      total: props.totalCount,
      blogs: props.blogs,
      rediret: false,
      cursor: props.cursor,
      hasnext: props.hasnext,
      page_arr: page_arr,
      loadedtill: 0,
      loading: false
    }
  }

  async loadPage (page) {
    var cursor = this.state.cursor
    var limit = 9
     
    var blogs = ''
    var curs = ''
    var hasnext = ''
    this.state.activePage = page

    var shallWeStore = true
    if (this.state.loadedtill >= page) {
      shallWeStore = false
      cursor = this.state.page_arr[page - 1]
    } else {
      this.state.loadedtill = this.state.loadedtill + 1
    }
    this.setState({ loading: true })
    var query_str='';
    if(this.state.categoryId ==='recent'){
      query_str=this.getBlogForNextOrPrevPageForRecent (cursor, limit);
    }
    else{
      query_str=this.getBlogForNextOrPrevPageForCategory(this.state.categoryId,cursor, limit);
    }
    apolloClient.query({
      query: query_str
    }).then(response => {
      blogs = response.data.allBlogss.edges
      curs = response.data.allBlogss.pageInfo.endCursor
      hasnext = response.data.allBlogss.pageInfo.hasNextPage
      if (shallWeStore === true) {
        this.state.page_arr[this.state.loadedtill] = curs
      }
      this.setState({ blogs: blogs, cursor: curs, hasnext: hasnext, loading: false })
    }).catch(error => {
      alert(error)
    })
  }

getBlogForNextOrPrevPageForRecent (lastPostCursor, limitation) {
    const query = gql`${queryAllBlogsForHome({ lastPostCursor, limitation })}`
    return query
  }
  
getBlogForNextOrPrevPageForCategory (categoryId, lastPostCursor, limitation) {
    const query = gql`${queryBlogsWithSameCategory({ categoryId, lastPostCursor, limitation })}`
    return query
  }

  async nextPage () {
    await this.loadPage(this.state.activePage + 1)
  }

  async prevPage () {
    if (this.state.activePage - 1 === 0) {
      this.state.hasprev = false
    }
    await this.loadPage(this.state.activePage - 1)
  }

  render () {
    if (this.state.loading) {
      return (
        <Layout>
          <div className='search-container container'>
            <form className='search-form' id='SearchForm'>
              <div className='search-bar-holder container mx-auto'>
                <input className='searchbar ml-3' type='text' placeholder='Search articles' id='addInput' title='Search' />
                <a href='#'> <img className='search-icon' src='/search.svg' title='Search by Voice' /></a>
              </div>
            </form>
          </div>
          <CategoryNavBar />
          <LoaderDeck />
        </Layout>
      )
    }
    return (
      <Layout>
        <div className='search-container container'>
          <form className='search-form' id='SearchForm'>
            <div className='search-bar-holder container mx-auto'>
              <input className='searchbar ml-3' type='text' placeholder='Search articles' id='addInput' title='Search' />
              <a href='#'> <img className='search-icon' src='/search.svg' title='Search by Voice' /></a>
            </div>
          </form>
        </div>
        <CategoryNavBar />
        {this.state.blogs && (
          <Deck
            cards={this.state.blogs}
            type='blog'
          />
        )}

        <button hidden={this.state.activePage === 0} onClick={() => this.prevPage()}>
         Previous
        </button>

        <p> </p>

        <button hidden={!this.state.hasnext} onClick={() => this.nextPage()}>
          Next
        </button>

      </Layout>

    )
  }
}

export default BlogPage

export async function getStaticProps ({ params }) {
  var category=params.category;
  var categoryId;
  var posts;
  if(category==='recent'){
    var categoryId='recent'
    posts = await getAllBlogsForHome(' ', 9)
  }
  else {
    var categories = await getCategoryIdByName(name_map[category])
    var post = categories[0].node
    categoryId = post._meta.id
    posts = await getBlogsWithSameCategory(categoryId, 6, '')
  }
  var blogs = posts.edges
  var cursor = posts.pageInfo.endCursor
  var totalCount = posts.totalCount
  var hasnext = posts.pageInfo.hasNextPage
  return {
    props: { blogs, cursor, totalCount, hasnext , categoryId}
  }
}

export async function getStaticPaths() {

  return {
    paths: [
      { params: { category: 'celluloid'} },
      { params: { category: 'scitech'} },
      { params: { category: 'alumspace'} },
      { params: { category: 'openpage'} },
      { params: { category: 'tete'} },
      { params: { category: 'recent'} }
     ],
   fallback: true // fallback is set to false because we already know the slugs ahead of time
 }  
}
