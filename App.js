import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./colors";
import TabMenu from "./components/TabMenu";
import ToDoItem from "./components/ToDoItem";

const STORAGE_KEY = "@toDos";
const INPUT_PLACEHOLDER = {
  work: "Add a To Do",
  travel: "Where do you want to go?",
};

export default function App() {
  const [nowTap, setNowTap] = useState("work");
  const [userInput, setUserInput] = useState("");
  const [toDos, setToDos] = useState({ work: [], travel: [] });
  const travel = () => setNowTap("travel");
  const work = () => setNowTap("work");
  const onChangeText = (payload) => setUserInput(payload);

  const addToDo = async () => {
    const newToDo = {
      ...toDos,
      [nowTap]: [
        ...toDos[nowTap],
        { id: Date.now(), userInput, isDone: false },
      ],
    };
    setToDos(newToDo);
    await saveToDos(newToDo);
    setUserInput("");
  };

  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.log(error);
    }
  };

  const loadToDos = async () => {
    try {
      const toDoItems = (await AsyncStorage.getItem(STORAGE_KEY)) || {
        work: [],
        travel: [],
      };
      setToDos(JSON.parse(toDoItems));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodoState = async (key) => {
    const newToDos = {
      ...toDos,
      [nowTap]: toDos[nowTap].map((toDo) => {
        if (toDo.id === key) {
          return { ...toDo, isDone: !toDo.isDone };
        }
        return toDo;
      }),
    };

    setToDos(newToDos);
    await saveToDos(newToDos);

    const beforeBatchToDoStatus = !toDos[nowTap].find((toDo) => toDo.id === key)
      .isDone;
    if (beforeBatchToDoStatus) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  // const addToDo = async () => {
  //   if (userInput === "") return;
  //   const newToDos = [
  //     ...toDos,
  //     { id: Date.now(), userInput, nowTap, isDone: false },
  //   ];
  //   setToDos(newToDos);
  //   await saveToDos(newToDos);
  //   setUserInput("");
  // };

  // const deleteToDo = async (key) => {
  //   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  //   Alert.alert("Delete To Do", "Are you sure?", [
  //     { text: "Cancel" },
  //     {
  //       text: "I'm sure",
  //       style: "destructive",
  //       onPress: deleteItem,
  //     },
  //   ]);

  //   async function deleteItem() {
  //     const newToDos = { ...toDos };
  //     delete newToDos[key];
  //     setToDos(newToDos);
  //     await saveToDos(newToDos);
  //   }
  // };

  // const modifyToDo = async ({ key, userInput }) => {
  //   const newToDos = {
  //     ...toDos,
  //     [key]: { ...toDos[key], userInput },
  //   };
  //   setToDos(newToDos);
  //   await saveToDos(newToDos);
  // };

  useEffect(() => {
    loadToDos();
  }, []);

  const toDoList = {
    work: toDos.work.map((toDo) => (
      <ToDoItem
        id={toDo.id}
        key={toDo.id}
        toDo={toDo}
        toggleTodoState={toggleTodoState}
      />
    )),
    travel: toDos.travel.map((toDo) => (
      <ToDoItem
        id={toDo.id}
        key={toDo.id}
        toDo={toDo}
        toggleTodoState={toggleTodoState}
      />
    )),
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.defaultFlex}>
        <TabMenu styles={styles} nowTap={nowTap} travel={travel} work={work} />
        <TextInput
          placeholder={INPUT_PLACEHOLDER[nowTap]}
          onChangeText={onChangeText}
          value={userInput}
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={addToDo}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {toDoList[nowTap]}
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
});
