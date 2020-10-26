import React from 'react'
import Link from 'next/link'

export default function ApertureCard ({ title, url,description}) {
    var fliphtmlLink="https://online.fliphtml5.com/"
    var endShot="/files/shot.jpg"
    var src=fliphtmlLink.concat(url).concat(endShot)
    var data_href=fliphtmlLink.concat(url)
    const aperturestyle = {
      height: "250px",
      width: "auto"
    };

    console.log(src)
    console.log(data_href)
    return (
        <>
          <div class="col-sm-12 col-md-3">
          <div class="card"></div>

        <div class="d-none d-md-block d-lg-block">
        <img class="img-stretch" src={src}
          data-rel="fh5-light-box-demo" data-href={data_href} data-width="900"
          data-height="500" data-title={title} style={aperturestyle}/> </div>

        <div class="d-block d-md-none d-lg-none">
        <img class="img-fluid" src={src}
          data-rel="fh5-light-box-demo" data-href={data_href} data-width="400"
          data-height="250" data-title={title} style={aperturestyle}/> </div>
       </div>

       <div class="card-body">
        <h3 class="card-title mb-1">{title}</h3>
          <p class="text-center">{description}</p></div>

      </>

    )
  
}

