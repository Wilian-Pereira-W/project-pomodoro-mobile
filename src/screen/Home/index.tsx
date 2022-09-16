import React from 'react';
import { useState } from 'react';
import PomodoroTimer from '../../components/PomodoroTimer';
import {
  Container,
  Contet,
  ContetPomodoro,
  ContetPomodoroTitle,
  PomodoroTime,
  Section,
  Title,
} from './styles';
function Home(): JSX.Element {
  const [pomodoroTime] = useState<number>(25);
  const [shortBreakTime] = useState<number>(5);
  const [longBreakTime] = useState<number>(15);
  const [isWorking, setIsWorking] = useState(false);

  return (
    <Container isWorking={isWorking}>
      <Contet>
        <Title>Pomodoro Timer</Title>
        <Section>
          <ContetPomodoro>
            <ContetPomodoroTitle>Pomodoro</ContetPomodoroTitle>
            <PomodoroTime>{`${pomodoroTime}:00`}</PomodoroTime>
          </ContetPomodoro>
          <ContetPomodoro>
            <ContetPomodoroTitle>Short Break</ContetPomodoroTitle>
            <PomodoroTime>{`${shortBreakTime}:00`}</PomodoroTime>
          </ContetPomodoro>
          <ContetPomodoro>
            <ContetPomodoroTitle> Long Break</ContetPomodoroTitle>
            <PomodoroTime>{`${longBreakTime}:00`}</PomodoroTime>
          </ContetPomodoro>
        </Section>
      </Contet>
      <PomodoroTimer
        setIsWorking={setIsWorking}
        pomodoroTime={pomodoroTime * 60}
        shortRestTime={shortBreakTime * 60}
        longRestTime={longBreakTime * 60}
        cycles={4}
        disabled={pomodoroTime <= 0}
      />
    </Container>
  );
}

export default Home;
