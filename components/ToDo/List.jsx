import { memo } from "react";
import Item from "./Item";

const List = (props) => {
  const { toDos } = props;
  console.log("render List");

  return toDos.map((toDo) => (
    <Item key={toDo.id} id={toDo.id} toDo={toDo} {...props} />
  ));
};

export default memo(List);
