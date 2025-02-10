import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
import { styles } from '../Styles/MainScreen.js';

export default function MainScreen() {
    const [totalTasks, setTotalTasks] = React.useState(0);
    const router = useRouter();
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
                    onPress={() => router.push('/Screens/TaskList')}
                />
                <View style={styles.buttonSpacing} />
                <Button
                    title="Add Task"
                    onPress={() => router.push('./AddTask')}
                />
            </View>
        </View>
    );
}


