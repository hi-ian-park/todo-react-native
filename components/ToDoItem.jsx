import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../colors";

const ToDoItem = ({ id, styles, toDos, toggleTodoState, deleteToDo }) => {
  const { isDone, userInput } = toDos;
  return (
    <View
      style={
        isDone
          ? { ...styles.toDo, backgroundColor: theme.doneTodo }
          : styles.toDo
      }
    >
      <View style={styles.toDoLeft}>
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
        <Text style={styles.toDoText}>{userInput}</Text>
      </View>

      <TouchableOpacity onPress={() => deleteToDo(id)}>
        <FontAwesome name="trash" size={20} color="#ff4747" />
      </TouchableOpacity>
    </View>
  );
};

export default ToDoItem;
