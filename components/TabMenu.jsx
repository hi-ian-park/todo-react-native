import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const TabMenu = ({ value, changeCurrentTap }) => {
  return (
    <Styled.Container>
      <TouchableOpacity onPress={() => changeCurrentTap("work")}>
        <Styled.TabButton name="work" value={value}>
          Work
        </Styled.TabButton>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeCurrentTap("travel")}>
        <Styled.TabButton name="travel" value={value}>
          Travel
        </Styled.TabButton>
      </TouchableOpacity>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.View`
    ${({ theme }) => theme.flexBox("row", "center", "space-between")};
    margin-top: 20px;
  `,

  TabButton: styled.Text`
    font-size: 32px;
    font-weight: 600;
    color: ${({ value, name, theme }) =>
      value === name ? theme.white : theme.grey};
  `,
};

export default TabMenu;
