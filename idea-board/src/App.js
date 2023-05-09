import React from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import usePersistState from "./hooks/usePersistState";

// List
import List from "./components/List";

const App = () => {
  const [state, setState] = usePersistState("lists", []);

  const createList = (e) => {
    e.preventDefault();
    setState([...state, { id: uuidv4(), title: "new title", items: [] }]);
  };

  const setListState = (list) => {
    let updatedList = state.map((item) => {
      if (item.id === list.id) {
        return list;
      }
      return item;
    });
    setState(updatedList);
  };

  return (
    <main>
      <header>
        <button onClick={createList}>New List</button>
      </header>
      {state.length > 0
        ? state.map((list) => (
            <List key={list.id} state={list} setState={setListState} />
          ))
        : null}
    </main>
  );
};

export default App;
