import React, { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";
import handleKeyUp from "../utils/handleKeyUp";
import moment from "moment";
import ListMenu from "./ListMenu";
import ResizeTextArea from "./ResizeTextArea";

const initialItemState = {
  id: null,
  title: "New Task",
  description: "",
  createdAt: moment(),
  updatedAt: moment(),
};

const List = ({ state, setState, deleteList, isFocused }) => {
  const [item, setItem] = useState(initialItemState);
  const titleRef = useRef(null);

  // Focus on the new item description for the first list on the page
  useEffect(() => {
    if (isFocused && titleRef.current) {
      titleRef.focus();
    }
  }, [titleRef.current]);

  // Change the list title
  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  // Make a change to the new item
  const handleChange = (id, text) => {
    setItem({ ...item, [id]: text });
  };

  // Submit new item to the list
  const createItem = (e) => {
    e.preventDefault();
    setState({ ...state, items: [...state.items, { ...item, id: uuidv4() }] });
    setItem(initialItemState);
  };

  // Function passed to the item for making changes after item creation
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
    if (state.items.length > 1) {
      let [x, y] = dir === "asc" ? [1, -1] : [-1, 1];

      let sortedItems = state.items.sort((a, b) => (a[type] > b[type] ? x : y));

      return setState({ ...state, items: sortedItems });
    }
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
        <ListMenu
          sortList={sortItems}
          deleteList={() => deleteList(state.id)}
        />
      </span>

      <div className="list-items">
        {state.items.length > 0 &&
          state.items.map((item) => (
            <ListItem
              key={item.id}
              data={item}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ))}
      </div>

      <div className="list-add-item">
        <ResizeTextArea
          id="title"
          className="edit-item-title"
          initialValue={item.title}
          onChange={handleChange}
        />
        <ResizeTextArea
          id="description"
          className="list-item-text-area"
          initialValue={item.description}
          onChange={handleChange}
          shouldFocus={isFocused}
          onSubmit={createItem}
        />
        <span className="list-add-item-footer">
          <button onClick={createItem}>
            <img
              className="icon"
              src="/icons/icons8-add-50-dark-blue.png"
              alt="delete"
            />
          </button>
          <p className="char-length">{item.description.length}</p>
        </span>
      </div>
    </div>
  );
};

export default List;
