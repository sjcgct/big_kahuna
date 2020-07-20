import React from 'react';
import Link from 'next/link';

export default function DeckCard ({title,imgurl,slugurl}) { 
    var redirect = { 
        pathname:`/blog/[slug]`,
        state: { slug: slugurl}
      };

        return(
            <div class="card mb-4 col-md-4 border-0">
            <div class="card-body ">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">Small version of the post</p>
            </div>
                <div class="card-footer" >
                <Link as={`/blog/${slugurl}`} href={redirect} >
                    <small class="text-danger stretched-link" >Read</small>
                </Link>
                {/* <a href={slugurl} class="stretched-link"></a>
                <small class="text-danger" >Read</small> */}
            </div>
            <img class="card-img-top"  src={imgurl} alt="Card image cap"/>
            </div>
        )
} 
