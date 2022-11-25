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
  function handleTotoItemCheck(item) {
    return item.isFinished ?
      api.deleteTodoDone(item._id) :
      api.putTodoDone(item._id);
  }

  function handleTodoItemDelete(id) {
    api.deleteTodoItem(id)
      .then(() => {
        setTodoListItems(prevList => prevList.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error(err);
      })
  }

  function handleTodoItemEdit(item) {
    setItemToEdit(item);
    history.push('/update');
  }

  function formatObjectForApi(values) {
    const { year, month, day, hour, minute } = values;

    const obj = {...values};

    obj.expires = new Date(`${year}-${month}-${day} ${hour}:${minute}:00`);
    obj.fileList = values.fileList.split('\n').filter(url => url.trim().length !== 0);

    delete obj.year;
    delete obj.month;
    delete obj.day;
    delete obj.hour;
    delete obj.minute;

    return obj;
  }

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

/*
Code structure

App.js
<Header> Show link to add new resource, on recource add back button

/add
<Add> Form with formik validation

/about
<About> copyinfo

/404
<Notfound>

Additional components
<Spinner>
<PopupWithForm> to edit

<Footer> with basic copy info

*/
