import React, { useState } from 'react'
import { Document, Page, pdfjs, Outline } from 'react-pdf'
import Layout from '../components/Layout'


export default function Aperture () {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  const scale = 3.2
  const height = 141.142 * scale
  const width = 100 * scale

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

  function onDocumentLoadSuccess ({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage (offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset)
  }

  function previousPage () {
    changePage(-2)
  }

  function nextPage () {
    changePage(2)
  }

  return (
    <>
      <Layout>
        <Document
          file='./sample.pdf'
          className='pdfframe'
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          

          <div className="row">

          <Page
            pageNumber={pageNumber} className='pdfpage' width={width} height={height} loading={<div></div>} error={<div/>} onLoadProgress={<div/>}
          />

          <Page
            pageNumber={pageNumber+1} className='pdfpage' width={width} height={height} loading={<div></div>} error={<div/>} onLoadProgress={<div/>}
          /> 

          </div>
          

        </Document>

        <div className='centered-content'>
          {/* <p>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p> */}
          <button
            type='button'
            className='button'
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
                        Previous
          </button>
          <button
            type='button'
            className='button'
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
                        Next
          </button>
        </div>
      </Layout>
    </>
  )
}
