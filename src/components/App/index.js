import React, { Component } from 'react';
import './bootstrap.min.css';

import TodoList from '../TodoList';
import SearchBar from '../SearchBar';
import TodoListSideBar from '../TodoListsSideBar';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <div className="container">
          <div className="row">
            <TodoListSideBar/>
            <TodoList/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
