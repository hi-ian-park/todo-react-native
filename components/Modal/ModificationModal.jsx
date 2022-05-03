import React from "react";
import { View, TextInput } from "react-native";
import Modal from "react-native-modal";
import { styles } from "../../App";

const ModificationModal = ({ id: key, toDo, modalInfo, setModalInfo }) => {
  const { userInput } = toDo;
  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={modalInfo.visible}
        onBackdropPress={() => setModalInfo({ ...modalInfo, visible: false })}
      >
        <View style={styles.toDo}>
          <TextInput
            value={userInput}
            onChangeText={(payload) =>
              modifyToDo({ key: modalInfo.key, userInput: payload })
            }
            style={styles.toDoText}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModificationModal;
