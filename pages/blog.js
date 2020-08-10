import React, { Component } from "react";
import { getAllBlogsForHome} from '../prismic-configuration'
import Pagination from "react-js-pagination";
import Layout from '../components/Layout'
import Deck from '../components/deck' 
import { PrismicLink } from 'apollo-link-prismic';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";




const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: `https://sjcgctrepo.prismic.io/graphql`,
    accessToken: process.env.PRISMIC_TOKEN,
  }),
  cache: new InMemoryCache()
});

class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      total:props.totalCount,
      blogs:props.blogs,
      rediret:false,
      cursor:props.cursor
    };

  }

  async loadNextPage(cursor,limit,pageno){
    console.log(this.getBlogForNextPage(cursor,limit));
    var blogs=''
    var curs=''
    apolloClient.query({
      query:this.getBlogForNextPage(cursor,limit)
    }).then(response => {
      console.log("success");
      blogs=response.data.allBlogss.edges
      curs=response.data.allBlogss.pageInfo.endCursor
      this.setState({blogs:blogs,cursor:curs,pageNumber:pageno})
    }).catch(error => {
      console.error("error");
      alert(error)
    });
    
  }

  getBlogForNextPage(lastPostCursor,limitation){
    const query =gql`
        {
          allBlogss(sortBy: date_DESC, after:"${lastPostCursor}",first:${limitation}){
            totalCount
            pageInfo{
              endCursor
              hasNextPage
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
        }
      `
  return query
  }
  async handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    await this.loadNextPage(this.state.cursor,6,pageNumber)
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

        <button onClick={() => this.handlePageChange(this.state.activePage+1)}>
          Next
        </button>
        </Layout>

    );
  }
}

export default BlogPage

export async function getServerSideProps({params,previewData}) {
  const posts=await getAllBlogsForHome(" ",6)
  var blogs=posts.edges
  var cursor=posts.pageInfo.endCursor
  var totalCount=posts.totalCount
  return {
    props: {blogs,cursor,totalCount}
  }
}

