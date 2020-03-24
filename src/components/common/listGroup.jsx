import React from "react";
const ListGroup = props => {
  const {
    items,
    onItemSelect,
    selectedItem
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          style={{ cursor: "pointer" }}
          className={
            selectedItem === item.toLowerCase() ? "list-group-item active" : "list-group-item"
          }
          key={item}
          onClick={() => onItemSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;