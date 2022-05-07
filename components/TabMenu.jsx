import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "../colors";

const TabMenu = ({ value, styles, changeCurrentTap, ...props }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => changeCurrentTap("work")}>
        <Text
          style={{
            ...styles.buttonText,
            color: value === "work" ? theme.white : theme.grey,
          }}
        >
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeCurrentTap("travel")}>
        <Text
          style={{
            ...styles.buttonText,
            color: value === "travel" ? theme.white : theme.grey,
          }}
        >
          Travel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabMenu;
