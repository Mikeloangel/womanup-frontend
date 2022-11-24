import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Todolist from './Todolist';

import api from '../utils/api';

function App() {
  //States
  const [todoListItems, setTodoListItems] = useState([]);

  //Effects
  useEffect(() => {
    api.getTodoList()
    .then((list)=>{
      setTodoListItems(list);
    })
    .catch(err=>{
      console.table(err);
    })
  }, [todoListItems]);

  return (
    <div className="body">
      <Header />

      <Switch>

        <Route exact path='/'>
          <Todolist list={todoListItems} />
        </Route>

        <Route exact path='/add'>
          <div>Add todo</div>
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
