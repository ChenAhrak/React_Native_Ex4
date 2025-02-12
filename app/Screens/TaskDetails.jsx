import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { styles } from '../Styles/TaskDetails';

export default function TaskDetails() {
    const { title, description, dueDate } = useLocalSearchParams(); // Get task details from navigation params


    //format date string to a readable format
    const formatDate = (dateString) => {
        if (!dateString) return "No due date";

        try {
            const date = new Date(dateString);

            if (isNaN(date.getTime())) { // Check for invalid date
                console.error("Invalid date string:", dateString);
                return "Invalid date";
            }

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Error formatting date";
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Task Details</Text>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{description || "No description available"}</Text>
            <Text style={styles.label}>Due:</Text>
            <Text style={styles.text}>{formatDate(dueDate) || "No due date"}</Text>
        </View>
    );
}

