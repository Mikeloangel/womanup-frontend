import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Todolist from './Todolist';

import api from '../utils/api';
import Update from './Update';

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
          <div>Add todo</div>
        </Route>

        <Route exact path='/update/'>
          <Update item={itemToEdit}/>
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
