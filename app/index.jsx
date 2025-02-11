import { useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { styles } from './Styles/MainScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export default function MainScreen() {
  const [totalTasks, setTotalTasks] = useState(0);
  const router = useRouter();

  // Load tasks when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTotalTasks(JSON.parse(savedTasks).length);
      } else {
        setTotalTasks(0);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Total Tasks: {totalTasks}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View Tasks"
          onPress={() => router.push("/Screens/TaskList")}
        />
        <View style={styles.buttonSpacing} />
        <Button
          title="Add/Edit Task"
          onPress={() => router.push('/Screens/AddEditTasks')}
        />
      </View>
    </View>
  );
}
