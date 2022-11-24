import React from "react";
import Todoitem from "./Todoitem";

export default function Todolist({list}){

  return(
    <main className="todolist">
      <ul className="todolist__list">
        {list.map((todoitem)=>(<li key={todoitem._id}><Todoitem item={todoitem}/></li>))}
      </ul>
    </main>
  )
}

/**
/
<TodoList>
  Additional - sort
 */
