import React, { Component } from 'react'
import { getBlogsForAuthor } from '../../prismic-configuration'
import { queryAllPostsByAuthor } from '../../author-api'
import Layout from '../../components/Layout'
import { PrismicLink } from 'apollo-link-prismic'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Loading from 'react-simple-loading'
import ProfileBanner from '../../components/ProfilePage/profileBanner'
import ProfileDeck from '../../components/profileDeck'
import IconButton from '../../components/IconButton'
import Head from 'next/head'

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
    // console.log(props.blogs);
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
      itemsPerPage: props.itemsPerPage,
      name: props.name,
      about: props.about,
      id: props.id,
      imgurl: props.imgurl
    }
  }

  async loadPage (page) {
    // console.log(this.getBlogForNextOrPrevPage(action,cursor,limit));
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
      query: this.getBlogsForAuthor(this.state.id, cursor, this.state.itemsPerPage)
    }).then(response => {
      // console.log('success')
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

  getBlogsForAuthor (authorId, lastPostCursor, limitation) {
    const query = gql`${queryAllPostsByAuthor({ authorId, lastPostCursor, limitation })}`
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
          <ProfileBanner name={this.state.name} imgurl={this.state.imgurl} imgalt={this.state.imgalt} about={this.state.about} />

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
        <Head>
          <title>{this.state.name + ' | Student Journalist Council - GCT'}</title>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <meta
            name='Keywords'
            content='Government College of Technology, GCT, Student Journalist Council, Student Journalist Council-GCT, Podcast, GCT Podcast'
          />
          <meta
            name='Description'
            content={this.state.about}
          />
        </Head>

        <ProfileBanner name={this.state.name} imgurl={this.state.imgurl} imgalt={this.state.imgalt} about={this.state.about} />

        {this.state.blogs && (
          <ProfileDeck
            cards={this.state.blogs}
            type='blogs'
          />
        )}

        <IconButton text="Previous" next={false} isHidden={this.state.activePage === 0} onClick={() => this.prevPage()}> </IconButton>
        <IconButton text="Next" next={true} isHidden={!this.state.hasnext} onClick={() => this.nextPage()}> </IconButton>

      </Layout>

    )
  }
}

export default AuthorBlogPage

export async function getServerSideProps ({ params }) {
  var id = params.slug
  var itemsPerPage = 6
  const posts = await getBlogsForAuthor(id, itemsPerPage, '')
  var blogs = posts.edges
  var cursor = posts.pageInfo.endCursor
  var totalCount = posts.totalCount
  var hasnext = posts.pageInfo.hasNextPage
  var name = blogs[0].node.author.name
  var about = blogs[0].node.author.about
  var imgurl = blogs[0].node.author.picture.url
  var imgalt = blogs[0].node.author.picture.alt
  return {
    props: { blogs, cursor, totalCount, hasnext, itemsPerPage, id, name, about, imgurl, imgalt }
  }
}
