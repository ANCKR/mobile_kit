import { router } from 'expo-router';
import { View, Text, Pressable, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center px-4 bg-white">
            <View className="px-4 w-full max-w-sm">
                <Text className="text-5xl font-bold mb-6 text-gray-900">Login</Text>

                <View className="flex flex-col gap-2">
                    <TextInput placeholder="Enter email address" className='border border-gray-400 rounded h-12 pl-2' />
                    <TextInput placeholder="Enter password" className='border border-gray-400 rounded h-12 pl-2' />
                </View>

                <View className="flex flex-end justify-end my-2">
                    <Pressable onPress={() => router.push("/auth/forgotPassword")}>
                        <Text className="text-gray-700 font-normal">Forgot password</Text>
                    </Pressable>
                </View>

                <TouchableOpacity className="bg-blue-500 flex py-4 rounded justify-center items-center mt-4">
                    <Text className="text-white">Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}
