import styled, { DefaultTheme } from 'styled-components/native';

export interface Props {
  working: false;
  theme: DefaultTheme;
}

export const ButtonOption = styled.TouchableOpacity`
  border: none;
  background: ${(props: Props) =>
    props.working
      ? props.theme.COLORS.BACKGROUND_TWO
      : props.theme.COLORS.BACKGROUND_ONE};
  cursor: pointer;
  padding: 10px;
  color: #000;
  transition: background-color 300ms ease-in-out;
  margin: 20px auto;
  width: 90px;
  align-items: center;
`;
