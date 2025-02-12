import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/AddEditTasks.js';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddEditTasks() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
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
            const updatedTasks = tasks.map(task =>
                task.id === editingTaskId ? { ...task, title: taskTitle, description: taskDescription, dueDate } : task
            );
            setTasks(updatedTasks);
            setEditingTaskId(null);
        } else {
            const newTask = { id: Date.now().toString(), title: taskTitle, description: taskDescription, dueDate };
            setTasks([...tasks, newTask]);
        }

        setTaskTitle('');
        setTaskDescription('');
        setDueDate(new Date());
    };

    const editTask = (task) => {
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setDueDate(new Date(task.dueDate));
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

    const formatDate = (date) => {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getBorderColor = (dueDateString) => {
        if (!dueDateString) {
            return '#ddd';
        }

        const dueDate = new Date(dueDateString);
        const now = new Date();

        const isOverdue = dueDate < now;
        const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

        let newBorderColor = 'lightgreen';
        if (isOverdue) {
            newBorderColor = '#FF474D';
        } else if (diffDays <= 1) {
            newBorderColor = 'yellow';
        }

        return newBorderColor;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add / Edit Tasks</Text>

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
                    style={styles.inputDescription}
                    placeholder="Task Description"
                    value={taskDescription}
                    onChangeText={setTaskDescription}
                    multiline
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true) } style={styles.dateContainer}>
                    <Text style={styles.dateText}>Due: {formatDate(dueDate)}</Text>
                    <Ionicons name="calendar" size={24} color="black" />
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setDueDate(selectedDate);
                                setShowTimePicker(true);
                            }
                        }}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={dueDate}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowTimePicker(false);
                            if (selectedTime) {
                                setDueDate(selectedTime);
                            }
                        }}
                    />
                )}
                <View style={styles.buttonContainer}>
                    <Button title={editingTaskId ? "Update Task" : "Add Task"} onPress={handleSaveTask} />
                </View>
            </View>

            {/* רשימת המשימות מוצגת מתחת */}
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                
                renderItem={({ item }) => {
                    const borderColor = getBorderColor(item.dueDate);
                    return (
                    <TouchableOpacity onPress={() =>
                        router.push({
                            pathname: '/Screens/TaskDetails',
                            params: { title: item.title, description: item.description || '', dueDate: item.dueDate || '' },
                        })
                    }>
                        <View style={[styles.taskItem, { borderColor }]}>
                            <Text style={styles.taskText}>{item.title}</Text>
                            <Text style={styles.taskDate}>Due: {formatDate(new Date(item.dueDate))}</Text>
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
                );
                }}
            />
        </View>
    );
}
