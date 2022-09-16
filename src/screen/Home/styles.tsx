import styled, { DefaultTheme } from 'styled-components/native';

export interface Props {
  isWorking: false;
  theme: DefaultTheme;
}

export const Container = styled.View`
  margin: 0 auto;
  background: ${(props: Props) =>
    props.isWorking
      ? props.theme.COLORS.BACKGROUND_TWO
      : props.theme.COLORS.BACKGROUND_ONE};
  height: 100%;
  width: 100%;
`;

export const Contet = styled.View`
  margin: 0 auto;
  margin-top: 60px;
`;

export const Section = styled.View`
  margin: 0 auto;
  background: #ffffff;
  margin-top: 20px;
  flex-direction: row;
  width: 350px;
  padding: 15px;
  border-radius: 8px;
  justify-content: space-around;
`;

export const Title = styled.Text`
  margin: 0 auto;
  color: #000;
  width: 200px;
  padding: 15px;
  text-align: center;
  margin-top: 20px;
  background: #fff;
  border-radius: 20px;
  font-size: 20px;
`;

export const ContetPomodoro = styled.View`
  align-items: center;
`;

export const ContetPomodoroTitle = styled.Text`
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 10px;
`;

export const PomodoroTime = styled.Text`
  border: 1px solid #000;
  width: 90px;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
`;
