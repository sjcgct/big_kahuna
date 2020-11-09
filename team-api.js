export const queryBlogsWithSlug = ({ slug }) => {
  const query =
    `{
      allBlogss(uid:"${slug}") {
      edges{
        node{
          title
          date
          featured_image
          excerpt
          body{
            ... on BlogsBodyQuote{
              primary {
                quote
              } 
              label
              type
            }
            ... on BlogsBodyImage{
              primary {
                image
                imageDescription
              }
              label
              type
            }
            ... on BlogsBodyParagraph{
              primary {
                paragraph
              }
              label
              type
            }
          }
          author {
            ... on Author{
              name
              picture
              about
              _meta {
                id
              }
            }
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
  return query
}

export const queryByYear = ({ year, lastPostCursor, limitation }) => {
  var prevyear = year - 1
  const query = `{
      allBlogss(where:{date_before:"${year}-12-31",date_after:"${prevyear}-12-31"},sortBy: date_DESC,after:"${lastPostCursor}",first:${limitation}){
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
              ... on Author{
                name
                picture
                about
                _meta {
                  id
                }
              }
            }
            
            category {
              _linkType
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

export default { queryBlogsWithSlug, queryByYear }
