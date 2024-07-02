import { View, Text, Pressable, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';

export default function ForgotPsswordScreen() {
    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center px-4 bg-white">
            <View className="px-4 w-full max-w-sm">
                <Text className="text-3xl font-bold mb-6 text-gray-900">Reset Password</Text>

                <View className="flex flex-col gap-2">
                    <TextInput placeholder="Enter email address" className='border border-gray-400 rounded h-12 pl-2' />
                </View>

                <TouchableOpacity className="bg-blue-500 flex py-4 rounded justify-center items-center mt-4">
                    <Text className="text-white">Send code</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}
