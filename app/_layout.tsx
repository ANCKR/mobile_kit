import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import useAuth from '@/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Linking from "expo-linking";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()
const prefix = Linking.createURL("/");

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    const handleDeepLink = (event: any) => {
      const { url } = event;
      console.log({url, event})
      const path = Linking.parse(url).path;
      console.log({path})

      // Use the parsed path to navigate to the appropriate screen
      if (path) {
        router.replace(path);
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    // Handle initial URL if the app was opened from a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Auth: "auth",
        Reset: "auth/resetPassword"
      },
    },
  };

  // useMemo(() => {
  //   const handleDeepLink = (event: any) => {
  //     const { url } = event;
  //     const path = Linking.parse(url).path;
  //     console.log({path})

  //     // Use the parsed path to navigate to the appropriate screen
  //     if (path) {
  //       router.replace(path);
  //     }
  //   };

  //   Linking.addEventListener('url', handleDeepLink);

  //   // Handle initial URL if the app was opened from a deep link
  //   Linking.getInitialURL().then((url) => {
  //     if (url) {
  //       handleDeepLink({ url });
  //     }
  //   });

  //   return () => {
  //     Linking.removeEventListener('url', handleDeepLink);
  //   };
  // }, [router]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack initialRouteName='index'>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
