import React from "react";
import { useHistory, useLocation } from "react-router-dom";


export default function Header(){
  const history = useHistory();
  const location = useLocation();

  function handleNewClick(){
    history.push('/add');
  }

  function handleBackClick(){
    history.push('/');
  }

  return (
    <header className="header">
      <h1 className="header__title">Todo List</h1>
      {location.pathname !== '/' && <button className="header__button header__button_back" onClick={handleBackClick}></button>}
      <button className="header__button header__button_new" onClick={handleNewClick}></button>
    </header>
  )
}
