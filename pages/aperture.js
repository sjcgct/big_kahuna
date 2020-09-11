import React, { useState } from 'react';
import { Document, Page, pdfjs, Outline } from 'react-pdf';
import Layout from '../components/Layout'
import Loading from 'react-simple-loading';


export default function Aperture() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const scale = 3.2
    const height = 141.142 * scale
    const width = 100 * scale
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <>
            <Layout>
                <Document
                    file="./sample.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <Loading
                            color='firebrick'
                            stroke='10px'
                            size='100px'
                        />
                    }
                >
                    <Page pageNumber={pageNumber} width={width} height={height} loading={
                        <Loading
                            color='firebrick'
                            stroke='0px'
                            size={height * 1.5}
                        ></Loading>}>
                    </Page>

                </Document>
                <div>
                    <p>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </p>
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                    >
                        Previous
        </button>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                    >
                        Next
        </button>
                </div>
            </Layout>
        </>
    );
}