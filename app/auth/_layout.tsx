import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs, useRouter } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const router = useRouter();
  return (
    <Stack initialRouteName='welcome' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerLeft: () => <Ionicons name='arrow-back-outline' size={20} onPress={() => router.back()} />,
        headerTitle: ""
      }} />
      <Stack.Screen name="signup" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerLeft: () => <Ionicons name='arrow-back-outline' size={20} onPress={() => router.back()} />,
        headerTitle: ""
      }} />
      <Stack.Screen name="forgotPassword" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerLeft: () => <Ionicons name='arrow-back-outline' size={20} onPress={() => router.back()} />,
        headerTitle: ""
      }}  />
    </Stack>
  );
}
