import React, { useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import usePersistState from "./hooks/usePersistState";

// List
import List from "./components/List";

const App = () => {
  const [state, setState] = usePersistState("lists", []);

  const createList = () => {
    setState([...state, { id: uuidv4(), title: "new title", items: [] }]);
  };

  const deleteList = (id) => {
    setState([...state.filter((list) => list.id !== id)]);
  };

  const updateList = (list) => {
    let updatedList = state.map((item) => {
      if (item.id === list.id) {
        return list;
      }
      return item;
    });
    setState(updatedList);
  };

  const scrollLeft = () => (document.getElementById("board").scrollLeft -= 300);
  const scrollRight = () =>
    (document.getElementById("board").scrollLeft += 300);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <main>
      <header className="header">
        <img
          className="icon"
          src="/icons/icons8-add-50.png"
          alt="delete"
          onClick={createList}
        />
      </header>
      <div className="main-container">
        <div className="icon-btn">
          <img
            className="icon"
            src="/icons/icons8-add-50.png"
            alt="delete"
            onClick={scrollLeft}
          />
        </div>

        <div id="board" className="board">
          {state.length > 0
            ? state.map((list) => (
                <List
                  key={list.id}
                  state={list}
                  setState={updateList}
                  deleteList={deleteList}
                />
              ))
            : null}
        </div>
        <div className="icon-btn">
          <img
            className="icon"
            src="/icons/icons8-add-50.png"
            alt="delete"
            onClick={scrollRight}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
