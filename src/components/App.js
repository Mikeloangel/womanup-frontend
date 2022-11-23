import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  //States

  return (
    <div className="root">
      <div className="test">
        <p className="test__two">Hello!</p>
      </div>
      <Switch>

        <Route exact path='/'>
          <div>All todos</div>
        </Route>

        <Route exact path='/add'>
          <div>Add todo</div>
        </Route>

        <Route path='*'>
          <div>404</div>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
