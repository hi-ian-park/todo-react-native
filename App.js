import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [isWorking, setIsWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setIsWorking(false);
  const work = () => setIsWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addTodo = () => {
    if (text === "") return;
    // save to do
    const newToDos = { ...toDos, [Date.now()]: { text, isWorking } };
    setText("");
    setToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.defaultFlex}>
        <View style={styles.header}>
          <TouchableOpacity onPress={work}>
            <Text
              style={{
                ...styles.buttonText,
                color: isWorking ? theme.white : theme.grey,
              }}
            >
              Work
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={travel}>
            <Text
              style={{
                ...styles.buttonText,
                color: isWorking ? theme.grey : theme.white,
              }}
            >
              Travel
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={isWorking ? "Add a To Do" : "Where do you want to go"}
          onChangeText={onChangeText}
          value={text}
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={addTodo}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.keys(toDos).map(
            (key) =>
              toDos[key].isWorking === isWorking && (
                <View style={styles.toDo} key={key}>
                  <Text style={styles.toDoText}>{toDos[key].text}</Text>
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
