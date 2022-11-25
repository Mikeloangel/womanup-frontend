import React from "react";
import Todoitem from "./Todoitem";


export default function Todolist({ list, onTodoChecked, onTodoDelete, onTodoEdit }) {

  return (
    <main className="todolist">
      <ul className="todolist__list">
        {list.map((todoitem) => (
          <li key={todoitem._id}>
            <Todoitem
              item={todoitem}
              onCheck={onTodoChecked}
              onDelete={onTodoDelete}
              onEdit={onTodoEdit}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
