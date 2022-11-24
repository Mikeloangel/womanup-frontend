import React, { useState } from "react";

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import fileImg from '../images/file.png';
import deleteImg from '../images/btn-delete.png';
import editImg from '../images/btn-edit.png';


export default function Todoitem({ item, onCheck, onDelete, onEdit }) {
  const [checked, setChecked] = useState(item.isFinished);
  dayjs.extend(isToday);
  dayjs.extend(isSameOrBefore);

  function handleCheck() {
    onCheck(item)
      .then(() => {
        setChecked(prev => !prev);
      });
  }

  function handleDelete() {
    onDelete(item._id);
  }

  function handleEdit(){
    onEdit(item);
  }

  const itemDate = new Date(item.expires);

  const todoItemClassName = `todoitem ${checked && "todoitem_checked"}`;
  let todoDateClassName = `todoitem__date`;

  if (!checked) {
    if (dayjs(itemDate).isToday()) {
      todoDateClassName += ' todoitem__date_today';
    } else {
      if (dayjs(itemDate).isSameOrBefore(dayjs())) {
        todoDateClassName += ' todoitem__date_past';
      }
    }
  }

  return (
    <div className={todoItemClassName}>
      <input type="checkbox" className="todoitem__done" checked={checked} value={checked} onChange={handleCheck} />
      <p className={todoDateClassName}>{itemDate.toLocaleDateString()} {itemDate.toLocaleTimeString()}</p>
      <div className="todoitem__info">
        <h2 className="todoitem__caption">{item.caption}</h2>
        <p className="todoitem__description">{item.description}</p>
      </div>
      <div className="todoitem__files">
        {
          item.fileList.length === 0 ?
            <p className="todoitem__files-empty">No files</p> :
            item.fileList.map((file, id) => <a href={file} key={id}><img src={fileImg} alt={item.caption} className="todoitem__file" /></a>)
        }
      </div>
      <button className="todoitem__btn" onClick={handleEdit}>
        <img src={editImg} className="todoitem__btn-ico" alt="Delete" />
      </button>
      <button className="todoitem__btn" onClick={handleDelete}>
        <img src={deleteImg} className="todoitem__btn-ico" alt="Delete" />
      </button>
    </div>
  )
}

/**
 *
  <TodoItem>
  | Checkbox   | Expires | Caption     | Filelist | Options
  |            | date    | Description |          |

  Checkbox - isFinished
    If checked strike over caption and decription

  Expires date:
    if in future - blue
    if today - yellow
    if past - red
    if checked and any state - gray

  Filelist:
    Shows as links icons __target:blanc ?

  Options:
    Delete

 */
