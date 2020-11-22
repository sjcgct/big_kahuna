import { tr } from 'date-fns/locale';
import React, { Component } from 'react'
import Layout from '../components/Layout'
import YearPagination from '../components/YearPagination'
import {getAllTeams} from '../prismic-configuration'


class About extends Component {
  constructor(props){
    super(props);
    var total_pages=props.years.length;
    this.state={
        years:props.years,
        year:props.current_year,
        total_pages:total_pages,
        current_page:0
    }
  }

  render () {
    return (
      <Layout>
         
        <YearPagination year={this.state.year} years={this.state.years}></YearPagination>
          
      </Layout>

    )
  }
}

export default About

export async function getStaticProps ({ preview = false, previewData }) {
  const teams = await getAllTeams();
  var edges=teams.edges;
  
  var years=[]
  for (var i=0;i<edges.length;i++){
    years[i]=edges[i].node.year;
  }
  var current_year=years[0];
  console.log(current_year);
  return {
    props: { years,current_year},
    revalidate: 1
  }
}
