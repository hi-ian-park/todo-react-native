import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [isWorking, setIsWorking] = useState(true);
  const [todoItem, setTodoItem] = useState("");
  const travel = () => setIsWorking(false);
  const work = () => setIsWorking(true);
  const onChangeText = (payload) => setTodoItem(payload);

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
          value={todoItem}
          style={styles.input}
        />
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
    marginTop: 20,
    fontSize: 16,
  },
});
