import React from "react";
import Modal from "react-native-modal";
import { View, TextInput, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { theme } from "../../colors";

const ModificationModal = ({ toDo, modalInfo, setModalInfo, modifyToDo }) => {
  const { userInput } = toDo;
  const { key } = modalInfo;
  return (
    <View style={styles.defaultFlex}>
      <Modal
        isVisible={modalInfo.visible}
        avoidKeyboard={true}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setModalInfo({ ...modalInfo, visible: false })}
      >
        <View style={styles.toDo}>
          <EvilIcons
            style={styles.icon}
            name="pencil"
            size={24}
            color={theme.modifyGrey}
          />
          <TextInput
            value={userInput}
            autoFocus={true}
            onEndEditing={() => setModalInfo({ ...modalInfo, visible: false })}
            onChangeText={(userInput) => modifyToDo({ key, userInput })}
            style={styles.toDoText}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModificationModal;

const styles = StyleSheet.create({
  defaultFlex: { flex: 1, paddingHorizontal: 30 },
  toDo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.toDoBackground.grey,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  toDoText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: theme.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
