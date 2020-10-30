export const queryAllApertures = ({ cursor, limit }) => {
  const query =
      `{
        allAperturess(after:"${cursor}",first:${limit}) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              description
              title
              link
            }
          }
        }
      }`
  return query
}

export default { queryAllApertures }
