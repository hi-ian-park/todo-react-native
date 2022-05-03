import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "../colors";

const Header = ({ nowTap, styles, work, travel, ...props }) => {
  return (
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
  );
};

export default Header;
