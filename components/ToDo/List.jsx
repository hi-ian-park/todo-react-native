import React from "react";
import Item from "./Item";

const List = (props) => {
  const { toDos, nowTap } = props;
  const nowTapToDos = toDos[nowTap];

  return nowTapToDos.map((toDo) => (
    <Item key={toDo.id} id={toDo.id} toDo={toDo} {...props} />
  ));
};

export default List;
