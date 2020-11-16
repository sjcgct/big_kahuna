import React, { Component } from 'react'
import { getCategoryIdByName, getBlogsWithSameCategory, getBlogsForAuthor } from '../prismic-configuration'
import Layout from '../components/Layout'
import Deck from '../components/deck'
import { PrismicLink } from 'apollo-link-prismic'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Loading from 'react-simple-loading'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '../components/IconButton'

const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://sjcgctrepo.prismic.io/graphql',
    accessToken: process.env.PRISMIC_TOKEN
  }),
  cache: new InMemoryCache()
})

class AuthorBlogPage extends Component {
  constructor (props) {
    super(props)
    var page_arr = []
    page_arr[0] = props.cursor
    this.state = {
      activePage: 0,
      total: props.totalCount,
      blogs: props.blogs,
      rediret: false,
      cursor: props.cursor,
      hasnext: props.hasnext,
      page_arr: page_arr,
      loadedtill: 0,
      loading: false,
      categoryId: props.categoryId,
      itemsPerPage: props.itemsPerPage
    }
  }

  async loadPage (page) {
    var cursor = this.state.cursor

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
    apolloClient.query({
      query: this.getBlogsForCategory(this.state.categoryId, cursor, this.state.itemsPerPage)
    }).then(response => {
      console.log('success')
      blogs = response.data.allBlogss.edges
      curs = response.data.allBlogss.pageInfo.endCursor
      hasnext = response.data.allBlogss.pageInfo.hasNextPage
      if (shallWeStore === true) {
        this.state.page_arr[this.state.loadedtill] = curs
      }
      this.setState({ blogs: blogs, cursor: curs, hasnext: hasnext, loading: false })
    }).catch(error => {
      console.error('error')
      alert(error)
    })
  }

  getBlogsForCategory (categoryId, lastPostCursor, limitation) {
    const query = gql`{
        allBlogss(where:{category:"${categoryId}"},sortBy: date_DESC, after:"${lastPostCursor}",first:${limitation}){
          pageInfo{
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges{
            node{
              title
              date
              featured_image
              excerpt
              author {
                _linkType
              }
              category {
                ... on Category{
                  name
                  _meta {
                    id
                  }
                }
              }
              _meta{
                uid
              }
              excerpt
            }
          }
        }
    }`
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
          <Loading
            color='firebrick'
            stroke='10px'
            size='100px'
          />
        </Layout>
      )
    }
    return (
      <Layout>

        {this.state.blogs && (
          <Deck
            cards={this.state.blogs}
            type='blogs'
          />
        )}

      <IconButton text="Previous" icon={<ArrowBackIcon></ArrowBackIcon>} isHidden={this.state.activePage === 0} onClick={() => this.prevPage()}> </IconButton>
      <IconButton text="Next" icon={<ArrowForwardIcon></ArrowForwardIcon>} isHidden={!this.state.hasnext} onClick={() => this.nextPage()}> </IconButton>

      </Layout>

    )
  }
}

export default AuthorBlogPage

export async function getServerSideProps () {
  var itemsPerPage = 6
  const posts = await getBlogsForAuthor(authorId, '', itemsPerPage)
  var blogs = posts.edges
  console.log(blogs.length)
  var cursor = posts.pageInfo.endCursor
  var totalCount = posts.totalCount
  var hasnext = posts.pageInfo.hasNextPage
  return {
    props: { blogs, cursor, totalCount, hasnext, categoryId, itemsPerPage }
  }
}
