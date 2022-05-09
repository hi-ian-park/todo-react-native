import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const TabMenu = ({ value, changeCurrentTap, ...props }) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => changeCurrentTap("work")}>
        <TabButton name="work" value={value}>
          Work
        </TabButton>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeCurrentTap("travel")}>
        <TabButton name="travel" value={value}>
          Travel
        </TabButton>
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  ${({ theme }) => theme.flexBox("row", "center", "space-between")};
  margin-top: 20px;
`;

const TabButton = styled.Text`
  font-size: 32px;
  font-weight: 600;
  color: ${({ value, name, theme }) =>
    value === name ? theme.white : theme.grey};
`;

export default TabMenu;
