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
      <Stack.Screen name="index" />
      <Stack.Screen name="Screens/TaskList" options={{title:'Task List'}}  />{/*This is the TaskList screen*/}
      {/* <Stack.Screen name="pageWOHeader" options={{ headerShown: false }} /> */}

    </Stack>
  )
}
