const { Component } = require("react");



const pagination_style=`
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
`

class YearPagination extends Component{
   constructor(props){
       super(props);
       var next_year=this.getNext(props.year,props.years);
       var prev_year=this.getPrev(props.year,props.years);
       var hide_next=false;
       var hide_prev=false;
       if(next_year===null) {
          hide_next=true;
       }
       if(prev_year===null) {
          hide_prev=true;
     }

       this.state={
        year:props.year,
        years:props.years,
        next_year:next_year,
        prev_year:prev_year,
        hide_next:hide_next,
        hide_prev:hide_prev
       }
   }
   
   getNext(current_year,years){
      if(years[years.length-1]===current_year){
          return null;
      }
      for(var i=0;i<years.length;i++){
          if(years[i]===current_year) return years[i+1];
      }
   }

   getPrev(current_year,years){
    if(years[0]===current_year){
        return null;
    }
    for(var i=1;i<years.length;i++){
        if(years[i]===current_year) return years[i-1];
    }
 }

   render(){
       return(
        <div className='row'>
        <div className='mx-auto'>
          <a hidden={this.state.hide_prev} href={`/team/${this.state.prev_year}`} className='about-pagination-previous'>&lt;</a>
          <span>{this.state.year}</span>
          <a hidden={this.state.hide_next} href={`/team/${this.state.next_year}`} className='about-pagination-next'>&gt;</a>
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
       )
   }

}

export default YearPagination;

