import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
/* class안에 소속되는 함수는 function 생략
 * 컴포넌트를 생성시에는 하나의 최상위 태그만 사용해야된다.
 * JSX를 사용하여, HTML 태그를 JS like하게 작성할 수 있으며, JSX는 해당 코드를 JS로 변환해준다.
 * 따라서, 리액트의 컴포넌트는 컴포넌트 이름에만 집중하게 하여, 복잡도를 낮추는 방식이다.
 */
class App extends Component {
  // 어떤 컴포넌트가 실행할 때, render()보다 먼저 실행되서 컴포넌트를 초기화해주기위함.
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    // 정보은닉의 개념으로, 외부에서는 state의 값이 있는지 없는지 모른다.
    this.state = {
      mode: 'welcome',
      select_content_id: 2,
      welcome: { title: 'Welcome', desc: 'Hello, React!!!' },
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is HyperText ...' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' },
      ],
    };
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.select_content_id) {
        return data;
      }
      i += 1;
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc} />;
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateContent
          onSubmit={function(_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
              mode: 'read',
              select_content_id: this.max_content_id,
            });
            console.log(_title, _desc);
          }.bind(this)}
        />
      );
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function(_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            debugger;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i += 1;
            }
            this.setState({
              contents: _contents,
            });
          }.bind(this)}
        />
      );
    }
    return _article;
  }
  render() {
    console.log('render', this);
    return (
      <div className="App">
        {/* 하드코딩된 Props를 State로 변경하여 제어하는 방법을 적용해보자! */}
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        />
        <TOC
          onChangePage={function(id) {
            this.setState({
              mode: 'read',
              select_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}
        />
        <Control
          onChangeMode={function(_mode) {
            if (_mode === 'delete') {
              if (window.confirm('really?')) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _contents,
                });
                alert('deleted!');
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
