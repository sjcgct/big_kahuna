export const queryAllAuthors = () => {
    const query =
          `{
            allAuthors{
              totalCount
              pageInfo{
                hasNextPage
                endCursor
              }
              edges{
                node{
                  name
                  picture
                  _meta {
                    id
                  }
                  _linkType
                }
              }
            }
          }
        `
    return query
  }

  export const queryAllPostsByAuthor= ({authorId,limitation,lastPostCursor}) =>{
      const query=
      `{
        allBlogss(where:{author:"${authorId}"},sortBy: date_DESC, after:"${lastPostCursor}",first:${limitation}){
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
  
  export default {queryAllAuthors,queryAllPostsByAuthor}