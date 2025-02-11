import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/TaskList.js';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Load tasks from AsyncStorage when the component mounts
    useEffect(() => {
        loadTasks();
    }, []);

    // Save tasks to AsyncStorage whenever they change
    useEffect(() => {
        saveTasks();
    }, [tasks]);

    // Function to load tasks from AsyncStorage
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

    // Function to save tasks to AsyncStorage
    const saveTasks = async () => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks:', error);
        }
    };

    const addTask = () => {
        if (newTask.trim() === '') return;
        const updatedTasks = [...tasks, { id: Date.now().toString(), text: newTask }];
        setTasks(updatedTasks);
        setNewTask('');
    };

    const deleteTask = (id) => {
        Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () => {
                    const updatedTasks = tasks.filter((task) => task.id !== id);
                    setTasks(updatedTasks);
                },
                style: 'destructive',
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Task List</Text>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskText}>{item.text}</Text>
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new task"
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <Button title="Add" onPress={addTask} />
            </View>
        </View>
    );
}
