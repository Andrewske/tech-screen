import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";
import usePersistState from "../hooks/usePersistState";

const initialState = {
  title: "New List",
  items: [],
};

const List = ({ state, setState }) => {
  const [itemText, setItemText] = useState("");
  const [itemTextLength, setItemTextLength] = useState(0);

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleTextAreaChange = (e) => {
    if (e.target.value.length <= 140) {
      setItemTextLength(e.target.value.length);
      setItemText(e.target.value);
    }
  };

  const createItem = (e) => {
    e.preventDefault();

    const item = {
      id: uuidv4(),
      text: itemText,
    };

    setState({ ...state, items: [...state.items, item] });
    setItemText("");
    setItemTextLength(0);
  };

  const editItem = (data) => {
    let updatedItems = state.items.map((item) => {
      if ((item.id = data.id)) {
        return { ...item, text: data.text };
      }
      return item;
    });
    setState({ ...state, items: updatedItems });
  };

  const deleteItem = (id) => {
    setState({ ...state, items: state.items.filter((item) => item.id !== id) });
    // setItems(items.filter((item) => item.id !== id));
  };

  useEffect(() => console.log(state.items), [state]);

  return (
    <div className="list-container">
      <input
        className="list-title"
        type="text"
        value={state.title}
        onChange={handleTitleChange}
      />

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
        <textarea
          className="list-item-text-area"
          value={itemText}
          onChange={handleTextAreaChange}
        />
        <span className="list-add-item-footer">
          <button className="add-item-btn" onClick={createItem}>
            Add Item
          </button>
          <p className="char-length">{itemTextLength}</p>
        </span>
      </div>
    </div>
  );
};

export default List;
