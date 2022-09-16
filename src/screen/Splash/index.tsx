import React, { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Image } from 'react-native';

function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      );
    }, 1500);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={styles.title}>Pomodoro Timer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#41E1BA',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Splash;
