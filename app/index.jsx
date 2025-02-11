import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
import { styles } from './Styles/MainScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen() {
  const [totalTasks, setTotalTasks] = useState(0);
  const router = useRouter();
useEffect(() => 
  {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          setTotalTasks(JSON.parse(savedTasks).length);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasks();
  }, [totalTasks]);
  
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Task Manager</Text>

            {/* General Information */}
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Total Tasks: {totalTasks}</Text>
            </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="View Tasks"
          onPress={() => router.push("/Screens/TaskList")}
        />
        <View style={styles.buttonSpacing} />
        <Button
          title="Add Task"
          onPress={() => router.push('/Screens/AddEditTask')}
        />
      </View>
    </View>
  );
}



