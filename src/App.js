import React, { Component } from 'react';
import './App.css';

const todoItems = [
  {
    id: 1,
    text: 'Пойти гулять',
    done: false
  },
  {
    id: 2,
    text: 'Пойти в магаз',
    done: false
  },
  {
    id: 3,
    text: 'Пойти в магаз',
    done: false
  }
];

const ToDoItem = ({ onCheck = f => f, onRemove = f => f, data }) => (
  <div className="todo_item">
    <p className="todo_item_text">{data.text}</p>
    <div
      onClick={onCheck}
      className={data.done ? 'todo_item_status done' : 'todo_item_status'}
    />
    <button className="todo_item_remove" type="button" onClick={onRemove}>
      ✕
    </button>
  </div>
);

const ToDoList = ({ data, onCheckItem = f => f, onRemoveItem = f => f }) => (
  <div className="todo_list">
    {data.length ? (
      data.map(function(item) {
        return (
          <ToDoItem
            key={item.id}
            data={item}
            onCheck={() => onCheckItem(item.id)}
            onRemove={() => onRemoveItem(item.id)}
          />
        );
      })
    ) : (
      <p>Список пуст</p>
    )}
  </div>
);

class Add extends React.Component {
  state = {
    text: ''
  };

  onBtnClickHandler = e => {
    e.preventDefault();
    const { text } = this.state;
    this.props.onAddTodo({
      id: this.props.getLastID() + 1,
      text,
      done: false
    });
    this.setState({
      text: ''
    });
  };

  handleChange = e => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value });
  };

  render() {
    const { text } = this.state;
    return (
      <form className="add">
        <textarea
          id="text"
          onChange={this.handleChange}
          className="add_text"
          placeholder="Текст итема"
          value={text}
        />
        <button className="add_btn" onClick={this.onBtnClickHandler}>
          Добавить итем
        </button>
      </form>
    );
  }
}

class App extends React.Component {
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

  getLastID = () => {
    return this.state.todo[this.state.todo.length - 1].id; /* переписать */
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
        />
      </React.Fragment>
    );
  }
}

export default App;
