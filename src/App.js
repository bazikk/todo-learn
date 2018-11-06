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
  },
];

class ToDoItem extends React.Component {

  handleBox = () =>{
    this.props.onCheck({
      id: this.props.data.id,
      done : !this.props.data.done
    })
  }

  render() {
    const { text, done } = this.props.data
    return (
      <div className='todo_item'>
        <p className='todo_item_text'>{text}</p>
        <div onClick={this.handleBox} className={done ? 'todo_item_status done' : 'todo_item_status'}></div>
      </div>
    )
  }
}

class ToDoList extends React.Component {
  renderToDoList = () => {
    const { data, onCheckItem } = this.props
    let todoList = null

    if (data.length) {
      console.log(data)
      todoList = data.map(function (item) {
        return <ToDoItem key={item.id} data={item} onCheck={(args)=>onCheckItem(args.id, args.done)}/>
      })
    } else {
      todoList = <p>Список пуст</p>
    }

    return todoList
  }
  render() {
    return (
      <div className='todo_list'>
        {this.renderToDoList()}
      </div>
    );
  }
}


class Add extends React.Component {
  state = {
    text: '',
  }

  onBtnClickHandler = (e) => {
    e.preventDefault()
    const { text } = this.state
    this.props.onAddTodo({
      id: this.props.getLastID() + 1,
      text,
      done: false
    })
  }

  handleChange = (e) => {
    const { id, value } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  render() {
    const { text } = this.state
    return (
      <form className='add'>
        <textarea
          id='text'
          onChange={this.handleChange}
          className='add_text'
          placeholder='Текст итема'
          value={text}
        ></textarea>
        <button
          className='add_btn'
          onClick={this.onBtnClickHandler}>
          Добавить итем
        </button>
      </form>
    )
  }
}


class App extends React.Component {

  state = {
    todo: todoItems,
  }

  handleAddTodo = (data) => {
    const newTodo = [data, ...this.state.todo]
    this.setState({ todo: newTodo })
  }

  onCheckItem = (data) =>{
    let newTodo = this.state.todo.map((el)=>{
      if(el.id == data.id){
        el.done = data.done;
      }
    })

    this.setState({
      todo: newTodo
    })
  }

  getLastID = () =>{
    return this.state.todo[this.state.todo.length - 1].id
  }

  render() {
    return (
      <React.Fragment>
        <Add onAddTodo={this.handleAddTodo} getLastID={this.getLastID}/>
        <h3>ToDo List</h3>
        <ToDoList data={this.state.todo} onCheckItem={this.onCheckItem}/>
      </React.Fragment>
    )
  }
}

export default App;
