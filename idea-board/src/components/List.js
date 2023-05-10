import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";
import handleKeyUp from "../utils/handleKeyUp";
import moment from "moment";
import ListMenu from "./ListMenu";

const initialItemState = {
  id: null,
  title: "New Task",
  description: "",
  createdAt: moment(),
  updatedAt: moment(),
};

const List = ({ state, setState, deleteList, isFocused }) => {
  const [item, setItem] = useState(initialItemState);

  useEffect(() => {
    if (isFocused) {
      let input = document.getElementById("new-item-title");
      input.focus();
    }
  });

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleChange = (e) => {
    if (e.target.id === "new-item-description") {
      if (e.target.value.length <= 140) {
        setItem({
          ...item,
          description: e.target.value,
        });
      }
    } else if (e.target.id === "new-item-title") {
      setItem({
        ...item,
        title: e.target.value,
      });
    }
  };

  const createItem = (e) => {
    e.preventDefault();
    setState({ ...state, items: [...state.items, { ...item, id: uuidv4() }] });
    setItem(initialItemState);
  };

  const editItem = ({ id, title, description }) => {
    let updatedItems = state.items.map((item) => {
      if (item.id === id) {
        return { ...item, title, description, updatedAt: moment() };
      }
      return item;
    });
    setState({ ...state, items: updatedItems });
  };

  const deleteItem = (id) => {
    setState({ ...state, items: state.items.filter((item) => item.id !== id) });
  };

  const sortItems = (type, dir) => {
    let items = state.items;
    if (items.length < 2) return;

    let sortedItems;

    switch (type) {
      case "title":
        if (dir === "asc") {
          sortedItems = items.sort((a, b) => (a.title > b.title ? 1 : -1));
          break;
        } else {
          sortedItems = items.sort((a, b) => (a.title > b.title ? -1 : 1));
          break;
        }
      case "date":
        if (dir === "asc") {
          sortedItems = items.sort((a, b) =>
            a.createdAt > b.createdAt ? -1 : 1
          );
          break;
        } else {
          sortedItems = items.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : -1
          );
          break;
        }
      default:
        console.log(type, dir);
    }

    return setState({ ...state, items: sortedItems });
  };

  return (
    <div className="list-container">
      <span className="list-header">
        <input
          className="list-title"
          type="text"
          value={state.title}
          onChange={handleTitleChange}
          onKeyUp={handleKeyUp}
        />
        <ListMenu sort={sortItems} />
      </span>

      <div className="list-items">
        {state.items.length > 0
          ? state.items.map((item) => (
              <ListItem
                key={item.id}
                data={item}
                editItem={editItem}
                deleteItem={deleteItem}
              />
            ))
          : null}
      </div>

      <div className="list-add-item">
        <div>
          <input
            id="new-item-title"
            className="edit-item-title"
            value={item.title}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        </div>
        <textarea
          id="new-item-description"
          className="list-item-text-area"
          value={item.description}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <span className="list-add-item-footer">
          <img
            className="icon"
            src="/icons/icons8-add-50-dark-blue.png"
            alt="delete"
            onClick={createItem}
          />
          <p className="char-length">{item.description.length}</p>
        </span>
      </div>
    </div>
  );
};

export default List;
