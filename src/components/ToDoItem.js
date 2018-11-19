import React, { Component } from 'react';

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
    const { data, onCheck = f => f, onRemove = f => f, top } = this.props
    return (
      <div style={{top:top}} className="todo_item" onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>
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

export { ToDoItem };