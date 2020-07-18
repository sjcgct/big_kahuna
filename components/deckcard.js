import React from 'react';
export default function DeckCard ({title,imgurl}) { 
        return(
            <div class="card mb-4 col-md-4 border-0">
            <div class="card-body ">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">Small version of the post</p>
            </div>
                <div class="card-footer">
                <small class="text-danger">Read</small>
            </div>
            <img class="card-img-top"  src={imgurl} alt="Card image cap"/>
            </div>
        )
} 