import React from 'react';
import { View } from 'react-native';
import MainScreen from './Screens/MainScreen';
import TaskList from './Screens/TaskList';

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <MainScreen />
    </View>
  );
}
