import Item from "./Item";

const List = (props) => {
  const { toDos } = props;

  return toDos.map((toDo) => (
    <Item key={toDo.id} id={toDo.id} toDo={toDo} {...props} />
  ));
};

export default List;
