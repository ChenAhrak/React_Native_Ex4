import { useEffect, useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles/MainScreen.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
      
      {/* אייקון של מחברת משימות */}
      <MaterialCommunityIcons 
        name="notebook-outline" 
        size={80} 
        color="black" 
        style={{ alignSelf: 'center', marginVertical: 10 }} 
      />
      
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
