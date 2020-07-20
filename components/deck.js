import React from 'react';
import ReactDOM from 'react-dom';
import DeckCard from './deckcard'
import { RichText } from 'prismic-reactjs'

export default function Deck ({cards}) { 
    var deckcards=[]
    var cardarray=cards;

    var arrayLength = cardarray.length;

    var index=arrayLength;
    for (var i = 0; i < arrayLength; i++) { 
      cardarray[index]=cards[i];
      index++;
    }

    arrayLength = cardarray.length;
    for (var i = 0; i < arrayLength; i++) { 
      var post = cardarray[i].node;
      deckcards[i]= <DeckCard title={RichText.asText(post.title)} imgurl={post.coverimage.url} slugurl={post._meta.uid}></DeckCard>
      //deckcards[i]= <DeckCard title="My title " imgurl="https://source.unsplash.com/random/6000*4000"></DeckCard>
    }
    
    return (
    <div class="row">
        {deckcards}
    </div>
    )
} 

//export default Deck;