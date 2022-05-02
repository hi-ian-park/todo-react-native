import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Vibration,
} from "react-native";
import { theme } from "./colors";
import Header from "./components/Header";
import ToDoItem from "./components/ToDoItem";

const STORAGE_KEY = "@toDOs";

export default function App() {
  const [nowTap, setNowTap] = useState("work");
  const [userInput, setUserInput] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [toDos, setToDos] = useState({});
  const travel = () => setNowTap("travel");
  const work = () => setNowTap("work");
  const onChangeText = (payload) => setUserInput(payload);

  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {}
  };

  const loadToDos = async () => {
    try {
      const toDoItems = (await AsyncStorage.getItem(STORAGE_KEY)) || {};
      setToDos(JSON.parse(toDoItems));
    } catch (error) {}
  };

  const addToDo = async () => {
    if (userInput === "") return;
    // save to do
    const newToDos = {
      ...toDos,
      [Date.now()]: { userInput, nowTap, isDone: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setUserInput("");
  };

  const toggleTodoState = async (key) => {
    const newToDos = {
      ...toDos,
      [key]: { ...toDos[key], isDone: !toDos[key].isDone },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);

    const beforeBatchToDoStatus = !toDos[key].isDone;
    if (beforeBatchToDoStatus) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const deleteToDo = async (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm sure",
        style: "destructive",
        onPress: deleteItem,
      },
    ]);

    async function deleteItem() {
      const newToDos = { ...toDos };
      delete newToDos[key];
      setToDos(newToDos);
      await saveToDos(newToDos);
    }
  };

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.defaultFlex}>
        <Header styles={styles} nowTap={nowTap} travel={travel} work={work} />
        <TextInput
          placeholder={
            nowTap === "work" ? "Add a To Do" : "Where do you want to go"
          }
          onChangeText={onChangeText}
          value={userInput}
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={addToDo}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.keys(toDos).map((key) => {
            return (
              toDos[key].nowTap === nowTap && (
                <ToDoItem
                  key={key}
                  id={key}
                  styles={styles}
                  toDos={toDos[key]}
                  toggleTodoState={toggleTodoState}
                  deleteToDo={deleteToDo}
                />
              )
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export const styles = StyleSheet.create({
  defaultFlex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "600",
  },
  input: {
    backgroundColor: theme.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 16,
  },
  toDo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.toDoBackground,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  doneIcon: {
    marginRight: 20,
  },
  toDoLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  toDoText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.white,
  },
});
