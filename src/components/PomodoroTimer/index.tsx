/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { useCallback, useEffect, useState, Dispatch } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { workedHours } from '../../utils/workedHours';
import Button from '../Button';
import Timer from '../Timer';
import { Container, Controls, Details, DetailsText, Title } from './styles';
import { Audio } from 'expo-av';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
  disabled: boolean;
  setIsWorking: Dispatch<React.SetStateAction<boolean>>;
}
function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState<number>(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);
  const [resting, setResting] = useState<boolean>(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState<boolean[]>(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
  const [soundStart, setSoundStart] = useState<Audio.Sound | null>(null);
  const [soundFinish, setSoundFinish] = useState<Audio.Sound | null>(null);

  async function playSoundStart() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/bell-start.mp3'),
    );
    setSoundStart(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return soundStart
      ? () => {
          soundStart.unloadAsync();
        }
      : undefined;
  }, [soundStart]);

  async function playSoundFinish() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/bell-finish.mp3'),
    );
    setSoundFinish(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return soundFinish
      ? () => {
          soundFinish.unloadAsync();
        }
      : undefined;
  }, [soundFinish]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    props.setIsWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    playSoundStart();
  }, [props]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      props.setIsWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
      playSoundFinish();
    },
    [props],
  );

  useEffect(() => {
    if (mainTime > 0) return;
    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    completedCycles,
    configureRest,
    configureWork,
    cyclesQtdManager,
    mainTime,
    numberOfPomodoros,
    props.cycles,
    resting,
    working,
  ]);
  return (
    <Container>
      <Title>Você está {working ? 'trabalhando.' : 'descansando.'}</Title>
      <Timer mainTimer={mainTime} />
      <Controls className="controls">
        <Button
          working={working}
          text="START"
          onPress={() => configureWork()}
          disabled={props.disabled}
        ></Button>
        <Button
          working={working}
          text="RESTING"
          onPress={() => configureRest(false)}
        ></Button>
        {(working || resting) && (
          <Button
            text={timeCounting ? 'PAUSE' : 'PLAY'}
            working={working}
            onPress={() => setTimeCounting(!timeCounting)}
          ></Button>
        )}
      </Controls>
      <Details>
        <DetailsText>Ciclos concluídos: {completedCycles}</DetailsText>
        <DetailsText>
          Horas trabalhadas: {workedHours(fullWorkingTime)}
        </DetailsText>
        <DetailsText>Pomodoros concluídos: {numberOfPomodoros}</DetailsText>
      </Details>
    </Container>
  );
}

export default PomodoroTimer;
