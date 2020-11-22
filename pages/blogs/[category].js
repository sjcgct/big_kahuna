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
import IconButton from '../../components/IconButton'
import Head from 'next/head'


var name_map={
  'celluloid': 'Celluloid',
  'scitech': 'SciTech',
  'alumspace': 'AlumSpace',
  'openpage': 'Open Page',
  'tete': 'Tete-a-Tete with Interns',
  'campus-pulse':'Campus Pulse'
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
      categoryName:props.categoryName,
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
    var limit = 12
     
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
    return (
      <Layout>
        <Head>
          <title>Blog | Student Journalist Gouncil - GCT</title>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <meta
            name='Keywords'
            content='Government College of Technology, GCT, Student Journalist Council, Student Journalist Council-GCT, Aperture, Aperture Newsletter, GCT Magazine, Student Magazine of GCT'
          />
          <meta
            name='Description'
            content='Student media body of Government College of Technology, Coimbatore. We are the face of Journalism and Photography inside the campus. We cover news happening inside the campus. We also publish the official student newsletter of the campus, Aperture.'
          />
        </Head>
        <CategoryNavBar category={this.state.categoryName}/>
        {this.state.blogs && (
          <Deck
            cards={this.state.blogs}
            type='blog'
          />
        )}
        {/* <IconButton text="Previous" next={false} isHidden={this.state.activePage === 0} onClick={() => this.prevPage()}> </IconButton>
        <IconButton text="Next" next={true} isHidden={!this.state.hasnext} onClick={() => this.nextPage()}> </IconButton> */}

        <div className='pagination'>
          <div className='previous-container'>
            <button className='button' hidden={this.state.activePage === 0} onClick={() => this.prevPage()}>
              Previous
            </button>
          </div>
          <div className='next-container'>
            <button className='button' hidden={!this.state.hasnext} onClick={() => this.nextPage()}>
              Next
            </button>
          </div>
        </div>

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
    posts = await getAllBlogsForHome(' ', 12)
  }
  else {
    var categories = await getCategoryIdByName(name_map[category])
    var post = categories[0].node
    categoryId = post._meta.id
    posts = await getBlogsWithSameCategory(categoryId, 12, '')
  }
  var blogs = posts.edges
  var cursor = posts.pageInfo.endCursor
  var totalCount = posts.totalCount
  var hasnext = posts.pageInfo.hasNextPage
  var categoryName=category
  return {
    props: { blogs, cursor, totalCount, hasnext , categoryId,categoryName}
  }
}

export async function getStaticPaths() {

  return {
    paths: [
      { params: { category: 'celluloid'} },
      { params: { category: 'scitech'} },
      { params: { category: 'alumspace'} },
      { params: { category: 'openpage'} },
      { params: { category: 'campus-pulse'} },
      { params: { category: 'tete'} },
      { params: { category: 'recent'} }
    ],
    fallback: true 
  }  
}
