import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { styles } from '../Styles/TaskDetails';

export default function TaskDetails() {
    const { title, description } = useLocalSearchParams(); // Get task details from navigation params

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Task Details</Text>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{description || "No description available"}</Text>
        </View>
    );
}

