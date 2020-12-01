export const queryAllTeams = () => {
  const query =
    `{
      allTeams(sortBy:year_ASC){
           edges{
            node{
              year
              teampicture
            }
          }
      }
    }
    `
  return query
}

export const queryByYear = ({ year }) => {
  const query = `
  {
    allTeams(where:{year:"${year}"}){
         edges{
          node{
            year
            teampicture
            _meta {
              id
            }
            body{
              ... on TeamBodySubTeam{
                type
                primary {
                  subTeam
                  memberList
                }
                label
              }
            }
          }
        }
    }
  }`
  return query
}

export default { queryAllTeams, queryByYear }
