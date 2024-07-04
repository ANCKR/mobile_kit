import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack initialRouteName='login' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
    </Stack>
  );
}
