import React, { Component } from 'react';

class Subject extends Component {
    render(){
      return (
        <header>
              {/* props는 HTML의 속성이라고 볼 수 있다. 
                  해당 코드는 Subject 태그를 사용하는 곳에서 props를 전달 받아서 동적으로 렌더링하는 방법이다.
              */}
              {/* <h1><a href="/">{this.props.title}</a></h1>        */}
              <h1><a href="/" onClick={function(e){
                e.preventDefault();
                this.props.onChangePage();
              }.bind(this)}>{this.props.title}</a></h1>
              <p>{this.props.sub}</p> 
        </header>
      );
    }
  }

  export default Subject;