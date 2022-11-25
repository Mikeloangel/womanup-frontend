import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Todolist from './Todolist';

import api from '../utils/api';
import Update from './Update';
import AddTodo from './AddTodo';

function App() {
  const history = useHistory();
  //States
  const [todoListItems, setTodoListItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  //Effects
  useEffect(() => {
    api.getTodoList()
      .then((list) => {
        setTodoListItems(list);
      })
      .catch(err => {
        console.table(err);
      })
  }, []);

  // hadlers
  // api request to change todo item isFinished state
  // returns promise back to <TodoList onTodoChecked={}/>
  function handleTotoItemCheck(item) {
    return item.isFinished ?
      api.deleteTodoDone(item._id) :
      api.putTodoDone(item._id);
  }

  // deletes item
  function handleTodoItemDelete(id) {
    api.deleteTodoItem(id)
      .then(() => {
        setTodoListItems(prevList => prevList.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error(err);
      })
  }

  // handles request to edit item
  function handleTodoItemEdit(item) {
    setItemToEdit(item);
    history.push('/update');
  }

  // formats submitted object under API standarrts
  function formatObjectForApi(values) {
    const { year, month, day, hour, minute } = values;

    // cloning object fields. othervise we can loose controlled state for inputs
    const obj = {...values};

    // formatting date
    obj.expires = new Date(`${year}-${month}-${day} ${hour}:${minute}:00`);

    // formatting fileList to array from string
    obj.fileList = values.fileList.split('\n').filter(url => url.trim().length !== 0);

    // excluding unused fields (Joi check and save traffic)
    delete obj.year;
    delete obj.month;
    delete obj.day;
    delete obj.hour;
    delete obj.minute;

    return obj;
  }

  // submitted values from todoitem edit
  function hadnleUpdateItem(values) {
    api.updateToDoItem(formatObjectForApi(values))
      .then(updatedItem => {
        setTodoListItems(prevList => [updatedItem, ...prevList.filter(item => item._id !== updatedItem._id)]);
        history.push('/');
      })
      .catch(err => {
        console.error(err);
      });
  }

  // submitted values from todoitem add
  function handleAddItem(values) {
    api.addToDoItem(formatObjectForApi(values))
    .then(newItem => {
      setTodoListItems(prevList => [...prevList, newItem]);
      history.push('/');
    })
    .catch(err =>{
      console.error(err);
    });
    console.log(values);
  }

  return (
    <div className="body">
      <Header />

      <Switch>

        <Route exact path='/'>
          <Todolist
            list={todoListItems}
            onTodoChecked={handleTotoItemCheck}
            onTodoDelete={handleTodoItemDelete}
            onTodoEdit={handleTodoItemEdit}
          />
        </Route>

        <Route exact path='/add'>
          <AddTodo
            onAdd={handleAddItem}
            title='Создать Todo'
            isDirtyFormik={true}
          />
        </Route>

        <Route exact path='/update'>
          <Update
            item={itemToEdit}
            onUpdate={hadnleUpdateItem}
            title="Обновить Todo"
            isDirtyFormik={false}
          />
        </Route>


        <Route exact path='/about'>
          <div>ABout</div>
        </Route>

        <Route path='*'>
          <div>404</div>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
