import React, { Component } from 'react';
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

class ToDoItem extends Component {
  state = {
    visibility: false
  }

  onEnter = () =>{
    this.setState({
      visibility:true
    })
  }

  onLeave = () =>{
    this.setState({
      visibility:false
    })
  }

  render() {
    const { data, onCheck = f => f, onRemove = f => f } = this.props
    return (
      <div className="todo_item" onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>
        <p className="todo_item_text">{data.text}</p>
        <div className="btns_container">
          <div
            onClick={onCheck}
            className={data.done ? 'todo_item_status done' : 'todo_item_status'}
          />
          {
            this.state.visibility ? 
            <button className="todo_item_remove" type="button" onClick={onRemove}>
            ✕
            </button> :
            ''
          }
          
        </div>
      </div>
    )
  }
}

const ToDoList = ({ data, onCheckItem = f => f, onRemoveItem = f => f, sortById = f => f, sortByStatus = f => f, sortByText = f => f }) => (
  <div className="todo_list">
    <div className="todo_list_header">
      <div onClick={sortById} className="sort_by sort_by_id">Сортировать по id</div>
      <div onClick={sortByText} className="sort_by sort_by_text">Сортировать по алфавиту</div>
      <div onClick={sortByStatus} className="sort_by sort_by_status">Сортировать по статусу</div>
    </div>
    {data.length ? (
      data.map(function (item) {
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

class Add extends Component {
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

  sortById = () =>{
    const sortedTodo = this.state.todo.sort((a,b)=>{return a.id - b.id})
    this.setState({
      todo: sortedTodo
    })
  }

  sortByText = () =>{
    const sortedTodo = this.state.todo.sort((a,b)=>{return (a.text).localeCompare(b.text);})
    this.setState({
      todo: sortedTodo
    })
  }

  sortByStatus = () =>{
    const sortedTodo = this.state.todo.sort((a,b)=>{return a ===  b ? 0 : a? -1: 1})
    this.setState({
      todo: sortedTodo
    })
  }

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
