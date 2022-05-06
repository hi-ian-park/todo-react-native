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
            ? { ...styles.toDo, backgroundColor: theme.toDoBackground.green }
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
    </>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  toDo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.toDoBackground.grey,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  doneIcon: {
    marginRight: 5,
  },
  toDoText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: theme.white,
  },
});
