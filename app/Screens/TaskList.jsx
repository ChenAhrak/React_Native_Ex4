import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/TaskList.js';
import { useRouter } from 'expo-router';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const router = useRouter();

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        saveTasks();
    }, [tasks]);

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

    const saveTasks = async () => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks:', error);
        }
    };

    const addTask = () => {
        if (taskTitle.trim() === '') return;
        const updatedTasks = [...tasks, { 
            id: Date.now().toString(), 
            title: taskTitle, 
            description: taskDescription 
        }];
        setTasks(updatedTasks);
        setTaskTitle('');
        setTaskDescription('');
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

    // alert of task details not used
    const showTaskDetails = (task) => {
        Alert.alert(task.title, task.description || 'No description provided.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Task List</Text>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity  onPress={() =>
                        router.push({
                            pathname: '/Screens/TaskDetails',
                            params: { title: item.title, description: item.description || '' },
                        })
                    }>
                        <View style={styles.taskItem}>
                            <Text style={styles.taskText}>{item.title}</Text>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Task Title"
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                    multiline
                    
                />
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    placeholder="Task Description"
                    value={taskDescription}
                    onChangeText={setTaskDescription}
                    multiline
                />
                <Button title="Add" onPress={addTask} />
            </View>
        </View>
    );
}
