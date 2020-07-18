import React from 'react';
import ReactDOM from 'react-dom';
import DeckCard from './deckcard'
import { RichText } from 'prismic-reactjs'

// class Deck extends React.Component {
    
//   constructor(props) {
//         super(props);
//         this.state = {
//           cards: props.cards,
//         };
//   }

//   render() {
//     deackcards=[]
//     var cardarray=this.props.cards;
//     var arrayLength = cardarray.length;
//     for (var i = 0; i < arrayLength; i++) { 
//       var singleCard=cardarray[i];
//       deckcards[i]= <DeckCard title={singleCard.title} imgurl={singleCard.coverimage.url}></DeckCard>
//     }
//     return (
//     <div class="card-deck">
//         {deckcards}
//     </div>
//     )
//    }
// }

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
      deckcards[i]= <DeckCard title={RichText.asText(post.title)} imgurl={post.coverimage.url}></DeckCard>
      //deckcards[i]= <DeckCard title="My title " imgurl="https://source.unsplash.com/random/6000*4000"></DeckCard>
    }
    
    return (
    <div class="card-deck">
        {deckcards}
    </div>
    )
} 

//export default Deck;