export const queryAllApertures = ({ cursor, limit }) => {
  const query =
      `{
        allAperturess(sortBy: date_DESC,after:"${cursor}",first:${limit}) {
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
