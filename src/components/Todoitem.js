import React, { useState } from "react";

import fileImg from '../images/file.png';
import deleteImg from '../images/btn-delete.png';
import editImg from '../images/btn-edit.png';

export default function Todoitem({ item }) {
  const [checked, setChecked] = useState(item.isFinished);

  function handleCheck() {
    setChecked(prev => !prev);
  }

  const itemDate = new Date(item.expires);


  return (
    <div className="todoitem">
      <input type="checkbox" className="todoitem__done" checked={checked} value={checked} onChange={handleCheck} />
      <p className="todoitem__date">{itemDate.toLocaleDateString()} {itemDate.toLocaleTimeString()}</p>
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
      <button className="todoitem__btn"><img src={editImg} className="todoitem__btn-ico" alt="Delete" /></button>
      <button className="todoitem__btn"><img src={deleteImg} className="todoitem__btn-ico" alt="Delete" /></button>
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
