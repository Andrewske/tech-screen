import React from "react";
import useHover from "../hooks/useHover";

const ListMenu = ({ sort }) => {
  //const [hoverRef, isHovered] = useHover();
  return (
    <span className="menu">
      <img
        className="icon menu-icon"
        src="/icons/icons8-menu-50.png"
        alt="menu"
      />
      <span className="menu-content">
        <span className="menu-item" onClick={() => sort("date", "asc")}>
          <img
            className="menu-item-icon"
            src="/icons/icons8-numeric-50.png"
            alt="menu"
          />{" "}
          <span>Sort Date Asc</span>
        </span>
        <span className="menu-item" onClick={() => sort("date", "desc")}>
          <img
            className="menu-item-icon"
            src="/icons/icons8-reversed-numeric-50.png"
            alt="menu"
          />{" "}
          <span>Sort Date Desc</span>
        </span>
        <span className="menu-item" onClick={() => sort("title", "asc")}>
          <img
            className="menu-item-icon"
            src="/icons/icons8-alphabetical-sorting-50.png"
            alt="menu"
          />{" "}
          <span>Sort Title Asc</span>
        </span>
        <span className="menu-item" onClick={() => sort("title", "desc")}>
          <img
            className="menu-item-icon"
            src="/icons/icons8-alphabetical-sorting-2-50.png"
            alt="menu"
          />{" "}
          <span>Sort Title Desc</span>
        </span>
        <span className="menu-item">
          <img
            className="menu-item-icon"
            src="/icons/icons8-delete-30.png"
            alt="delete"
          />{" "}
          <span>Delete List</span>
        </span>
      </span>
    </span>
  );
};

export default ListMenu;
