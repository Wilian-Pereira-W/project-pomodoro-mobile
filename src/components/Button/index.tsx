import React from 'react';
import { Text } from 'react-native';
import { ButtonOption } from './styles';

interface Props {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  working?: boolean;
}
function Button(props: Props): JSX.Element {
  return (
    <ButtonOption
      onPress={props.onPress}
      disabled={props.disabled}
      working={props.working}
    >
      <Text>{props.text}</Text>
    </ButtonOption>
  );
}

export default Button;
