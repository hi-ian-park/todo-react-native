import React, { useState, useRef } from "react";
import { TouchableOpacity, TextInput } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../colors";

const ToDoItem = ({
  id: key,
  styles,
  toDo,
  toggleTodoState,
  deleteToDo,
  modifyToDo,
}) => {
  const { isDone, userInput } = toDo;
  const refInput = useRef(null);

  const pressModifyButton = () => focusInput(true);
  const blurModifyButton = () => focusInput(false);

  const focusInput = (nowState) => {
    if (nowState) refInput.current.focus();
  };

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
        onPress={() => toggleTodoState(key)}
      >
        <MaterialCommunityIcons
          style={styles.icon}
          name={isDone ? "checkbox-marked" : "checkbox-blank-outline"}
          size={24}
          color="#62BB47"
        />
      </TouchableOpacity>
      <TextInput
        value={userInput}
        onChangeText={(payload) => modifyToDo({ key, userInput: payload })}
        pointerEvents="none"
        onBlur={blurModifyButton}
        style={styles.toDoText}
        ref={refInput}
      />
      <TouchableOpacity onPress={() => deleteToDo(key)}>
        <FontAwesome
          style={styles.icon}
          name="trash"
          size={20}
          color="#ff4747"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ToDoItem;
