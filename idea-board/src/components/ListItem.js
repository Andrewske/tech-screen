import React, { useState } from "react";
import handleKeyUp from "../utils/handleKeyUp";
import moment from "moment";

const ListItem = ({ data, editItem, deleteItem }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === "title") {
      editItem({ ...data, title: e.target.value });
    } else if (e.target.id === "description") {
      editItem({ ...data, description: e.target.value });
    }
  };

  return (
    <div className="list-item" id={data.id}>
      <div>
        <input
          id="title"
          className="edit-item-title"
          value={data.title}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      {openEdit ? (
        <div>
          <textarea
            id="description"
            className="edit-item-text-area"
            value={data.description}
            onChange={handleChange}
          />
        </div>
      ) : (
        data.description
      )}
      {openTime && (
        <div className="list-item-time">
          <p>
            Created At: {moment(data.createdAt).format("yyyy-MM-DD h:mm a")}
          </p>{" "}
          <p>
            Updated At: {moment(data.updatedAt).format("yyyy-MM-DD h:mm a")}
          </p>
        </div>
      )}
      <span className="list-item-footer">
        <img
          className="icon"
          src="/icons/icons8-clock-50.png"
          alt="time"
          onClick={() => setOpenTime(!openTime)}
        />
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
          onClick={() => setOpenEdit(!openEdit)}
        />
      </span>
    </div>
  );
};

export default ListItem;
