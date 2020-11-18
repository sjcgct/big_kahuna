export const queryAllTeams = ( ) => {
  const query =
    `{
      allTeams{
           edges{
            node{
              year
            }
          }
      }
    }
    `
  return query
}

export const queryByYear = ({ year}) => {
  const query = `
  {
    allTeams(where:{year:"${year}"}){
         edges{
          node{
            year
          }
        }
    }
  }`
  return query
}

export default { queryAllTeams, queryByYear }
