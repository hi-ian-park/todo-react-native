import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../colors";

const ToDoItem = ({
  id,
  styles,
  toDos,
  toggleTodoState,
  deleteToDo,
  modifyToDo,
}) => {
  const { isDone, userInput } = toDos;
  const [text, setText] = useState(userInput);
  const refInput = useRef(null);

  const pressModifyButton = () => focusInput(true);
  // blur되었을 때 자동으로 내용이 state에 올라가야함
  const blurModifyButton = () => {
    focusInput(false);
    modifyToDo({ key: id, userInput: text });
  };

  const focusInput = (nowState) => {
    if (nowState) refInput.current.focus();
    return;
  };

  const onChangeText = (payload) => setText(payload);

  return (
    <TouchableOpacity
      style={
        isDone
          ? { ...styles.toDo, backgroundColor: theme.doneTodo }
          : styles.toDo
      }
      onPress={pressModifyButton}
    >
      <TouchableOpacity
        style={styles.doneIcon}
        onPress={() => toggleTodoState(id)}
      >
        <MaterialCommunityIcons
          name={isDone ? "checkbox-marked" : "checkbox-blank-outline"}
          size={24}
          color="#62BB47"
        />
      </TouchableOpacity>
      {/* {textArea[isModifying ? "modify" : "normal"]} */}
      <TextInput
        value={text}
        onChangeText={onChangeText}
        pointerEvents="none"
        onBlur={blurModifyButton}
        style={styles.toDoText}
        ref={refInput}
      />
      <TouchableOpacity onPress={() => deleteToDo(id)}>
        <FontAwesome name="trash" size={20} color="#ff4747" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ToDoItem;
