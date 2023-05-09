import React, { useState } from "react";

const ListItem = ({ data, editItem, deleteItem }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [text, setText] = useState(data.text);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleEdit = () => {
    if (openEdit) {
      editItem({ id: data.id, text });
    }
    setOpenEdit(!openEdit);
  };

  return (
    <div className="list-item" id={data.id}>
      {openEdit ? (
        <div>
          <textarea
            className="edit-item-text-area"
            value={text}
            onChange={handleChange}
          />
        </div>
      ) : (
        text
      )}
      <span className="list-item-footer">
        <img
          className="icon"
          src="/icons/icons8-delete-30.png"
          alt="delete"
          onClick={() => deleteItem(data.id)}
        />
        <img
          className="icon"
          src="/icons/icons8-edit-50.png"
          alt="edit"
          onClick={() => handleEdit()}
        />
      </span>
    </div>
  );
};

export default ListItem;
