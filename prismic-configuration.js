import Prismic from 'prismic-javascript'
import { eachDayOfInterval } from 'date-fns'
const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
export const API_TOKEN = process.env.PRISMIC_TOKEN
export const API_LOCALE = process.env.PRISMIC_LOCALE
// Prismic API endpoint
export const apiEndpoint = process.env.PRISMIC_URL

// Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = process.env.PRISMIC_TOKEN

// Client method to query Prismic
export const client = Prismic.client(apiEndpoint, { accessToken })

export const PrismicClient = Prismic.client(REF_API_URL,{
  accessToken: API_TOKEN
})

async function fetchAPI (query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi()
  const res = await fetch(
      `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
      {
        headers: {
          'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
          'Content-Type': 'application/json',
          'Accept-Language': API_LOCALE,
          Authorization: `Token ${API_TOKEN}`
        }
       
      }
  )

  if (res.status !== 200) {
    console.log(await res.text())
    throw new Error('Failed to fetch API')
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllBlogsForHome (previewData,lastPostCursor,limitation) {
  const data = await fetchAPI(
      `
      {
        allBlogss(sortBy: date_DESC, after:"${lastPostCursor}",first:${limitation}){
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
    `,
      { previewData }
  )
  return data.allBlogss.edges
}

export async function getBlogsWithSlug(previewData,slug) {

const query=
`{
  allBlogss(uid:"${slug}") {
  edges{
    node{
      title
      date
      content
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
      _meta {
        uid
      }
      excerpt
    }
   }
  }
}
`  
const data = await fetchAPI(query,{previewData})
return data.allBlogss.edges
}


export async function getBlogsWithSameCategory(previewData,categoryId,limitation,lastPostCursor){
  const query=
  `{
    allBlogss(where:{category:"${categoryId}"},sortBy: date_DESC, after:"${lastPostCursor}",first:${limitation}){
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
}`
const data = await fetchAPI(query,{previewData})
return data.allBlogss.edges
}