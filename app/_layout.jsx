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
      <Stack.Screen name="MainScreen" />
      <Stack.Screen name="TaskList" />
      {/* <Stack.Screen name="pageWOHeader" options={{ headerShown: false }} /> */}
     
    </Stack>
  )
}
