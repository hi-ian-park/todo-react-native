import { memo } from "react";
import Item from "./Item";

const List = (props) => {
  const { toDos } = props;
  return toDos.map((toDo) => <Item key={toDo.id} toDo={toDo} {...props} />);
};

export default memo(List);
