import React, { Component } from 'react';
import { Document, Page, pdfjs, Outline } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
import '../public/sample.less';



const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

export default class Sample extends Component {
  state = {
    file:'./sample.pdf',
    numPages: null,
  }
  

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
   
    const { file, numPages } = this.state;

    return (
      <div className="Example">
        <header>
          <h1>react-pdf sample page</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>
            {' '}
            <input
              onChange={this.onFileChange}
              type="file"
            />
          </div>
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              options={options}
            >
              {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ),
                )
              }
            </Document>
          </div>
        </div>
      </div>
    );
  }
}