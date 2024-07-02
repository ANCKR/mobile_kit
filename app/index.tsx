import { router } from "expo-router"
import { Button, SafeAreaView, Text, TouchableOpacity, View } from "react-native"

const WelcomeScreen = () => {
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