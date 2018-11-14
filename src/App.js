import React, { Component } from 'react';
import { Add } from './components/Add';
import { ToDoList } from './components/ToDoList';
import './App.css';

const todoItems = [
  {
    id: 3,
    text: 'Пойти в магаз',
    done: false
  },
  {
    id: 1,
    text: 'Пойти гулять',
    done: false
  },
  {
    id: 2,
    text: 'Пойти в магаз',
    done: false
  }
];

class App extends Component {
  state = {
    todo: todoItems
  };

  handleAddTodo = data => {
    const newTodo = [...this.state.todo, data];
    this.setState({ todo: newTodo });
  };

  onCheckItem = id => {
    const newTodo = this.state.todo.map(el => {
      if (el.id == id) {
        el.done = !el.done;
      }
      return el;
    });

    this.setState({
      todo: newTodo
    });
  };

  onRemoveItem = id => {
    const newTodo = this.state.todo.filter(el => el.id !== id);
    this.setState({
      todo: newTodo
    });
  };

  sortById = () => {
    const sortedTodo = this.state.todo.sort((a, b) => {
      return a.id - b.id;
    });
    this.setState({
      todo: sortedTodo
    });
  };

  sortByText = () => {
    const sortedTodo = this.state.todo.sort((a, b) => {
      return a.text.localeCompare(b.text);
    });
    this.setState({
      todo: sortedTodo
    });
  };

  sortByStatus = () => {
    const sortedTodo = this.state.todo.sort((a, b) => {
      return a === b ? 0 : a ? -1 : 1;
    });
    this.setState({
      todo: sortedTodo
    });
  };

  getLastID = () => {
    return this.state.todo.length;
  };

  render() {
    return (
      <React.Fragment>
        <Add onAddTodo={this.handleAddTodo} getLastID={this.getLastID} />
        <h3>ToDo List</h3>
        <ToDoList
          data={this.state.todo}
          onCheckItem={this.onCheckItem}
          onRemoveItem={this.onRemoveItem}
          sortById={this.sortById}
          sortByText={this.sortByText}
          sortByStatus={this.sortByStatus}
        />
      </React.Fragment>
    );
  }
}

export default App;
