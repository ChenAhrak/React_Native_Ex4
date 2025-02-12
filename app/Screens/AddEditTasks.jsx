import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/AddEditTasks.js';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddEditTasks() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
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

    // Add or Update Task
    const handleSaveTask = () => {
        if (taskTitle.trim() === '') return;

        if (editingTaskId) {
            // Update existing task
            const updatedTasks = tasks.map(task =>
                task.id === editingTaskId ? { ...task, title: taskTitle, description: taskDescription } : task
            );
            setTasks(updatedTasks);
            setEditingTaskId(null);
        } else {
            // Add new task
            const newTask = { id: Date.now().toString(), title: taskTitle, description: taskDescription };
            setTasks([...tasks, newTask]);
        }

        setTaskTitle('');
        setTaskDescription('');
    };

    // Edit Task
    const editTask = (task) => {
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setEditingTaskId(task.id);
    };

    // Delete Task
    const deleteTask = (id) => {
        Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () => {
                    setTasks(tasks.filter((task) => task.id !== id));
                },
                style: 'destructive',
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Task List</Text>

            {/* תיבת הקלט מוצגת למעלה */}
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
                <Button title={editingTaskId ? "Update Task" : "Add Task"} onPress={handleSaveTask} />
            </View>

            {/* רשימת המשימות מוצגת מתחת */}
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() =>
                        router.push({
                            pathname: '/Screens/TaskDetails',
                            params: { title: item.title, description: item.description || '' },
                        })
                    }>
                        <View style={styles.taskItem}>
                            <Text style={styles.taskText}>{item.title}</Text>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity onPress={() => editTask(item)}>
                                    <MaterialIcons name="edit" size={24} color="blue" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                    <MaterialIcons name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
