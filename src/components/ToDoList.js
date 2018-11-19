import React, { Component } from 'react';
import { ToDoItem } from './ToDoItem';

const ToDoList = ({ data, onCheckItem = f => f, onRemoveItem = f => f, sortById = f => f, sortByStatus = f => f, sortByText = f => f }) => (
  <div className="todo_list">
    <div className="todo_list_header">
      <div onClick={sortById} className="sort_by sort_by_id">Сортировать по id</div>
      <div onClick={sortByText} className="sort_by sort_by_text">Сортировать по алфавиту</div>
      <div onClick={sortByStatus} className="sort_by sort_by_status">Сортировать по статусу</div>
    </div>
    {data.length ? (
      data.map(function (item,index) {
        return (
          <ToDoItem
            key={item.id}
            data={item}
            top={32*index+20}
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

export { ToDoList }