import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/TaskList.js';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() === '') return;
        setTasks([...tasks, { id: Date.now().toString(), text: newTask }]);
        setNewTask('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
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


