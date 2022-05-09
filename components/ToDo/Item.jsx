import { useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ModificationModal from "../Modal/ModificationModal";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const Item = ({ id: key, toDo, toggleToDoState, deleteToDo, modifyToDo }) => {
  const [modalInfo, setModalInfo] = useState({ visible: false, key: "" });
  const { isDone, userInput } = toDo;
  const pressModifyButton = () => {
    setModalInfo({ visible: true, key: key });
  };
  const checkBoxName = isDone ? "checkbox-marked" : "checkbox-blank-outline";

  return (
    <>
      <Styled.Container isDone={isDone} onPress={() => pressModifyButton(key)}>
        <Styled.CheckBox onPress={() => toggleToDoState(key)}>
          <MaterialCommunityIcons
            name={checkBoxName}
            size={24}
            color="#62BB47"
          />
        </Styled.CheckBox>
        <Styled.ToDoText>{userInput}</Styled.ToDoText>
        <TouchableOpacity onPress={() => deleteToDo(key)}>
          <FontAwesome name="trash" size={20} color="#ff4747" />
        </TouchableOpacity>
      </Styled.Container>
    </>
  );
};

const Styled = {
  Container: styled.Pressable`
    ${({ theme }) => theme.flexBox("row", "center", "space-between")};
    margin-bottom: 10px;
    padding: 20px;
    background-color: ${({ isDone, theme }) =>
      isDone ? theme.bgGreen : theme.bgGrey};
    border-radius: 15px;
  `,

  CheckBox: styled.TouchableOpacity`
    margin-right: 10px;
  `,

  ToDoText: styled.Text`
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.white};
  `,
};

export default Item;
