import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
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
} from "react-native";
import { theme } from "./colors";
import { FontAwesome } from "@expo/vector-icons";

const STORAGE_KEY = "@toDOs";

export default function App() {
  const [nowTap, setNowTap] = useState("work");
  const [userInput, setUserInput] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setNowTap("travel");
  const work = () => setNowTap("work");
  const onChangeText = (payload) => setUserInput(payload);

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    try {
      const toDoItems = (await AsyncStorage.getItem(STORAGE_KEY)) || {};
      setToDos(JSON.parse(toDoItems));
    } catch (error) {
      console.log(error);
    }
  };

  const addToDo = async () => {
    if (userInput === "") return;
    // save to do
    const newToDos = {
      ...toDos,
      [Date.now()]: { userInput, nowTap, done: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setUserInput("");
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

  console.log(toDos);

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.defaultFlex}>
        <View style={styles.header}>
          <TouchableOpacity onPress={work}>
            <Text
              style={{
                ...styles.buttonText,
                color: nowTap === "work" ? theme.white : theme.grey,
              }}
            >
              Work
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={travel}>
            <Text
              style={{
                ...styles.buttonText,
                color: nowTap === "travel" ? theme.white : theme.grey,
              }}
            >
              Travel
            </Text>
          </TouchableOpacity>
        </View>
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
          {Object.keys(toDos).map(
            (key) =>
              toDos[key].nowTap === nowTap && (
                <View style={styles.toDo} key={key}>
                  <Text style={styles.toDoText}>{toDos[key].userInput}</Text>
                  <TouchableOpacity onPress={() => deleteToDo(key)}>
                    <FontAwesome name="trash" size={20} color="#ff4747" />
                  </TouchableOpacity>
                </View>
              )
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  toDoText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.white,
  },
});
