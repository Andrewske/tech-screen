import React from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

// Hooks
import usePersistState from "./hooks/usePersistState";
import useWindowSize from "./hooks/useWindowSize";
import useScroll from "./hooks/useScroll";

// List
import List from "./components/List";

const App = () => {
  const [state, setState] = usePersistState("lists", []);
  const { width } = useWindowSize();

  const { scrollLeft, scrollRight } = useScroll();

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
        {width > 400 && (
          <div className="icon-btn">
            <img
              className="icon"
              src="/icons/icons8-back-arrow-50.png"
              alt="delete"
              onClick={scrollLeft}
            />
          </div>
        )}

        <div id="board" className="board">
          {state.length > 0
            ? state.map((list, i) => (
                <List
                  key={list.id}
                  state={list}
                  setState={updateList}
                  deleteList={deleteList}
                  isFocused={i === 0 ? true : false}
                />
              ))
            : null}
        </div>
        {width > 400 && (
          <div className="icon-btn right">
            <img
              className="icon"
              src="/icons/icons8-circled-right-50.png"
              alt="delete"
              onClick={scrollRight}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
