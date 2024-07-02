import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack initialRouteName='login' screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
    </Stack>
  );
}
