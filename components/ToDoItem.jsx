import React, { useState, useRef } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../colors";
import { styles } from "../App";
import ModificationModal from "./Modal/ModificationModal";

const ToDoItem = ({
  id: key,
  toDo,
  toggleTodoState,
  deleteToDo,
  modifyToDo,
}) => {
  const [modalInfo, setModalInfo] = useState({ visible: false, key: "" });
  const { isDone, userInput } = toDo;
  const pressModifyButton = () => {
    setModalInfo({ visible: true, key: key });
  };

  return (
    <>
      <Pressable
        style={
          isDone
            ? { ...styles.toDo, backgroundColor: theme.doneTodo }
            : styles.toDo
        }
        onPress={() => pressModifyButton(key)}
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
        <Text style={styles.toDoText}>{userInput}</Text>
        <TouchableOpacity onPress={() => deleteToDo(key)}>
          <FontAwesome
            style={styles.icon}
            name="trash"
            size={20}
            color="#ff4747"
          />
        </TouchableOpacity>
      </Pressable>
      <ModificationModal
        id={modalInfo.key}
        styles={styles}
        toDo={toDo}
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        modifyToDo={modifyToDo}
      />
    </>
  );
};

export default ToDoItem;
