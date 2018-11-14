import React, { Component } from 'react';

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

export { Add };