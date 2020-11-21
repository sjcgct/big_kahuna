import React, { Component } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'

class About extends Component {
  render () {
    return (
      <Layout>
        <div className='row'>
          <div className='mx-auto'>
            <a href='/blog' className='about-pagination-previous'>&lt;</a>
            <span>2014-15</span>
            <a href='/blog' className='about-pagination-next'>&gt;</a>
            <style jsx>{`
          .about-pagination-previous {
            
            margin-left: 5px;
            vertical-align: bottom;
            display: inline-block;
            margin-left: 5px;
            font-size: 22px;
            line-height: 23px;
            font-weight: 100;
          }
          .about-pagination-next {
            
            margin-left: 5px;
            vertical-align: bottom;
            display: inline-block;
            margin-left: 5px;
            font-size: 22px;
            line-height: 23px;
            font-weight: 100;
          }
          `}
            </style>
          </div>
        </div>
      </Layout>

    )
  }
}

export default About
