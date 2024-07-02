import { useQuery } from "@tanstack/react-query";
import { Redirect, router } from "expo-router"
import { ActivityIndicator, Button, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import * as SecureStore from "expo-secure-store"

const WelcomeScreen = () => {
    const { isLoading: isAuthLoading, data } = useQuery({
        queryKey: ['auth_status'],
        queryFn: async () => {
            const authStatus = await SecureStore.getItemAsync("token")
            if (authStatus) return true
            else return false
        }
    })
    console.log({ isAuthLoading, data })

    if (isAuthLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    } else {
        if (data == true) return <Redirect href={"/home"} />
        else return <Redirect href={"/auth/login"} />
    }

    return (
        <SafeAreaView className="bg-white h-full p-4 flex flex-col justify-center items-center">
            <Text className="text-2xl font-semibold">Welcome to Mobile Kit </Text>
            <View className="flex flex-col space-y-1 mt-4 w-full px-5">
                <TouchableOpacity className="bg-green-500 flex py-4 w-full rounded justify-center items-center" onPress={() => router.push("/auth/login")}>
                    <Text className="text-white">Login</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-blue-500 flex py-4 rounded justify-center items-center" onPress={() => router.push("/auth/signup")}>
                    <Text className="text-white">Signup</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen