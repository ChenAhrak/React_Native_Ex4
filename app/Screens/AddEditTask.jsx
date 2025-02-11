import { View, Text, FlatList, } from 'react-native';
import React, {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/AddEditTask.js';

export default function AddEditTask() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
            setTasks(JSON.parse(savedTasks));
        }
    } catch (error) {
        console.error('Failed to load tasks:', error);
    }
};


    return (
      <View>
        <Text style={styles.header}>Add or Edit Task</Text>
          <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <View style={styles.taskItem}>
                      <Text style={styles.taskText}>{item.text}</Text>
                  </View>
              )}
          />
      </View>
    )
  }