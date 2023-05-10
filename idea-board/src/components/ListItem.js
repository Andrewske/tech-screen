import React, { useState } from "react";
import moment from "moment";

import ResizeTextArea from "./ResizeTextArea";

const ListItem = ({ data, editItem, deleteItem }) => {
  const [openTime, setOpenTime] = useState(false);

  const handleChange = (id, text) => {
    editItem({ ...data, [id]: text });
  };

  return (
    <div className="list-item" id={data.id}>
      <ResizeTextArea
        id="title"
        className="edit-item-title"
        initialValue={data.title}
        onChange={handleChange}
        colorShouldChange={true}
      />
      <ResizeTextArea
        id="description"
        className={"edit-item-text-area"}
        initialValue={data.description}
        onChange={handleChange}
        colorShouldChange={true}
      />
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
      </span>
    </div>
  );
};

export default ListItem;
