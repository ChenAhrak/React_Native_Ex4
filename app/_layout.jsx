import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      //headerShown: false,
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="index" options={{title:''}}/>
      <Stack.Screen name="Screens/TaskList" options={{title:''}}  />{/*This is the TaskList screen*/}
      <Stack.Screen name="Screens/AddEditTasks" options={{title:''}}  />{/*This is the TaskList screen*/}
      <Stack.Screen name="Screens/TaskDetails" options={{title:''}}  /> {/*This is the TaskDetails screen*/}
      {/* <Stack.Screen name="pageWOHeader" options={{ headerShown: false }} /> */}

    </Stack>
  )
}
