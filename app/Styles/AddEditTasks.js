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
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 2,
      borderRadius: 5,
      elevation: 2,
      width: '100%',
      alignSelf: 'center',
    },
    taskText: {
      fontSize: 16,
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
    buttonGroup:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonContainer:{
      alignSelf: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginBottom: 10,
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
    }
  });