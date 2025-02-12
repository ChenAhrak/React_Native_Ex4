import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, KeyboardAvoidingView, Platform,TouchableWithoutFeedback,Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/TaskList.js';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const router = useRouter();
    const [showInputFields, setShowInputFields] = useState(false);

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
        const updatedTasks = [
            ...tasks,
            { 
                id: Date.now().toString(), 
                title: taskTitle, 
                description: taskDescription, 
                dueDate: dueDate
            }
        ];
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

    const formatDate = (date) => {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { flex: 1 }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <Text style={styles.header}>Task List</Text>
            <View style={styles.buttonContainer}>
                <Button title={showInputFields ? "Hide input fields" : "New Task"}
                onPress={() => setShowInputFields(!showInputFields)} 
                style={styles.toggleButton} />
            </View>


        {showInputFields && (
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
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateContainer}>
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
                    <Button title="Add" onPress={addTask} />
                </View>
            </View>
            )}
            <FlatList
                style={{ flex: 1 }}
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() =>
                        router.push({
                            pathname: '/Screens/TaskDetails',
                            params: { title: item.title, description: item.description || '', dueDate: item.dueDate || '' },
                        })
                    }>
                        <View style={styles.taskItem}>
                            <Text style={styles.taskText}>{item.title}</Text>
                            <Text style={styles.taskDate}>Due: {formatDate(new Date(item.dueDate))}</Text>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <MaterialIcons name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </KeyboardAvoidingView>
    );
}
