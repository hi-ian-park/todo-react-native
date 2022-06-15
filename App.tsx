// RN, Expo
import { memo, useState, useEffect, useCallback } from "react";
import { Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

// store
import { types } from "mobx-state-tree";
import { observer } from "mobx-react";

// style
import styled from "styled-components/native";
import { ThemeProvider } from "styled-components";
import { color, mixins } from "./styles/theme";

// components
import TabMenu from "./components/TabMenu";
import ToDoList from "./components/ToDo/List";
import Input from "./components/ToDo/Input";

type ToDos = {
  work: ToDoItem[];
  travel: ToDoItem[];
};

type ToDoItem = {
  id: number;
  userInput: string;
  isDone: boolean;
};

const STORAGE_KEY = "@toDos";

function App() {
  const [currentTap, setCurrentTap] = useState("work");
  const [toDos, setToDos] = useState<ToDos>({ work: [], travel: [] });
  const changeCurrentTap = (value) => setCurrentTap(value);

  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.log(error);
    }
  };

  const loadToDos = async () => {
    try {
      const toDoItems =
        (await AsyncStorage.getItem(STORAGE_KEY)) || JSON.stringify(toDos);
      setToDos(JSON.parse(toDoItems));
    } catch (error) {
      console.log(error);
    }
  };

  const onCreate = useCallback(async (userInput) => {
    const newToDo = {
      ...toDos,
      [currentTap]: [
        ...toDos[currentTap],
        { id: Date.now(), userInput, isDone: false },
      ],
    };
    setToDos(newToDo);
    await saveToDos(newToDo);
  }, []);

  const onCheck = useCallback(async (key) => {
    const newToDos = {
      ...toDos,
      [currentTap]: toDos[currentTap].map((toDo) => {
        if (toDo.id === key) {
          return { ...toDo, isDone: !toDo.isDone };
        }
        return toDo;
      }),
    };
    setToDos(newToDos);
    await saveToDos(newToDos);

    const beforeBatchToDoStatus = !toDos[currentTap].find(
      (toDo) => toDo.id === key
    ).isDone;
    if (beforeBatchToDoStatus) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, []);

  const onDelete = useCallback(async (key) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm sure",
        style: "destructive",
        onPress: deleteItem,
      },
    ]);

    async function deleteItem() {
      const newToDos = {
        ...toDos,
        [currentTap]: toDos[currentTap].filter((toDo) => toDo.id !== key),
      };
      setToDos(newToDos);
      await saveToDos(newToDos);
    }
  }, []);

  const onModify = useCallback(async ({ key, userInput }) => {
    const newToDos = {
      ...toDos,
      [currentTap]: toDos[currentTap].map((toDo) => {
        if (toDo.id === key) {
          return { ...toDo, userInput };
        }
        return toDo;
      }),
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
  }, []);

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <>
      <ThemeProvider theme={{ ...color, ...mixins }}>
        <Styled.Container>
          <StatusBar style="light" />
          <Styled.SafeContainer>
            <TabMenu value={currentTap} changeCurrentTap={changeCurrentTap} />
            <Input currentTap={currentTap} onCreate={onCreate} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <ToDoList
                toDos={toDos[currentTap]}
                onCheck={onCheck}
                onModify={onModify}
                onDelete={onDelete}
              />
            </ScrollView>
          </Styled.SafeContainer>
        </Styled.Container>
      </ThemeProvider>
    </>
  );
}

export default App;

const Styled = {
  Container: styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    padding: 30px;
  `,
  SafeContainer: styled.SafeAreaView`
    background-color: ${({ theme }) => theme.background};
    flex: 1;
  `,

  ToDoInput: styled.TextInput`
    background-color: ${({ theme }) => theme.white};
    padding: 15px 20px;
    border-radius: 30px;
    margin: 20px 0;
    font-size: 16px;
  `,
};
