import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    taskItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      marginVertical: 5,
      borderWidth: 2,
      borderColor: '#ddd',
      backgroundColor: '#fff',
      borderRadius: 5,
      elevation: 2,
    },
    taskText: {
      fontSize: 16,
    },
    buttonContainer:{
      alignSelf: 'center',
      marginBottom: 10,
    },
    deleteButton: {
      color: 'red',
      fontWeight: 'bold',
    },
    inputContainer: {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginTop: 20,
      marginBottom: 20,
    },
    inputDescription: {
      textAlignVertical: 'top',
      height: 80,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    dateContainer:{
      flexDirection: 'row',
      borderRadius: 5,
      padding: 10,
      marginRight: 50,
      marginBottom: 10,
    },
    dateText: {
      marginRight: 10,
      fontSize: 16,
    },
    // Add these to your existing styles
// taskItem: {
//   // ... your existing styles ...
//   flexDirection: 'row',
//   alignItems: 'center',
// },
checkbox: {
  padding: 10,
},
// taskContent: {
//   flex: 1,
//   padding: 10,
// },
completedTaskText: {
  textDecorationLine: 'line-through',
  color: '#888',
},
deleteButton: {
  padding: 10,
},
  });