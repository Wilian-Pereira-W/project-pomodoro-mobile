import React from 'react';
import { secondsToTime } from '../../utils/secondsToTime';
import { Container, Time } from './styles';

interface Props {
  mainTimer: number;
}
function Timer(props: Props): JSX.Element {
  return (
    <Container>
      <Time>{secondsToTime(props.mainTimer)}</Time>
    </Container>
  );
}

export default Timer;
