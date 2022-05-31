import { memo, useState } from "react";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const Item = ({ toDo, onCheck, onDelete, onModify }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id, isDone, userInput } = toDo;
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const checkBoxName = isDone ? "checkbox-marked" : "checkbox-blank-outline";
  // console.log(`Item Render id: ${toDo.id}`);

  return (
    <>
      <Styled.Container isDone={isDone} onPress={openModal}>
        <Styled.CheckBox onPress={() => onCheck(id)}>
          <MaterialCommunityIcons
            name={checkBoxName}
            size={24}
            color="#62BB47"
          />
        </Styled.CheckBox>
        <Styled.ToDoText>{userInput}</Styled.ToDoText>
        <TouchableOpacity onPress={() => onDelete(id)}>
          <FontAwesome name="trash" size={20} color="#ff4747" />
        </TouchableOpacity>
      </Styled.Container>

      <Styled.ModalLayer>
        <Modal
          isVisible={isModalVisible}
          avoidKeyboard={true}
          backdropTransitionOutTiming={0}
          onBackdropPress={closeModal}
        >
          <Styled.Container>
            <Styled.CheckBox onPress={() => onCheck(id)}>
              <MaterialCommunityIcons
                name={checkBoxName}
                size={24}
                color="#62BB47"
              />
            </Styled.CheckBox>
            <Styled.TextInput
              value={userInput}
              autoFocus={true}
              onChangeText={(userInput) => onModify({ key: id, userInput })}
            ></Styled.TextInput>
            <TouchableOpacity onPress={() => onDelete(id)}>
              <FontAwesome name="trash" size={20} color="#ff4747" />
            </TouchableOpacity>
          </Styled.Container>
        </Modal>
      </Styled.ModalLayer>
    </>
  );
};

export default memo(Item);

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

  // TODO: as 를 쓰거나 상속받아서 사용할 수 있는지 확인해 볼 것
  TextInput: styled.TextInput`
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.white};
  `,

  ModalLayer: styled.View`
    flex: 1;
  `,
};
