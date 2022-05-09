import { useState } from "react";
import styled from "styled-components/native";

const INPUT_PLACEHOLDER = {
  work: "Add a To Do",
  travel: "Where do you want to go?",
};

const Input = ({ currentTap, onCreate }) => {
  const [userInput, setUserInput] = useState("");
  const onChangeText = (payload) => setUserInput(payload);
  const onSubmit = () => {
    onCreate(userInput);
    setUserInput("");
  };

  return (
    <Styled.ToDoInput
      placeholder={INPUT_PLACEHOLDER[currentTap]}
      onChangeText={onChangeText}
      value={userInput}
      returnKeyType="done"
      onSubmitEditing={onSubmit}
    />
  );
};

export default Input;

const Styled = {
  ToDoInput: styled.TextInput`
    background-color: ${({ theme }) => theme.white};
    padding: 15px 20px;
    border-radius: 30px;
    margin: 20px 0;
    font-size: 16px;
  `,
};
