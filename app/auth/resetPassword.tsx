import ToastAlert from '@/components/ToastAlert';
import { authResetPassword } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, Button, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';

const ResetPasswordScreen = () => {
    const router = useRouter()
    const local = useLocalSearchParams();
    const resetPasswordUuid: string | string[] | null = local?.uuid ?? null;

    useEffect(() => {
        if (!resetPasswordUuid) {
            ToastAlert("Error", "Invalid request!");
            router.replace("/auth/login");
        }
    }, [resetPasswordUuid])

    const [password, setPassword] = useState("");

    const { isPending, data, mutate: handleResetPassword } = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: async () => {
            const res = await authResetPassword(resetPasswordUuid, password)
            return res;
        },
        onSuccess: (data) => {
            const resMessage = data?.message;
            ToastAlert("Success", resMessage);
            router.replace("/auth/login")
        }
    })

    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center px-4 bg-white">
            <View className='w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0'>
                <View className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <Text className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                        Reset Password
                    </Text>
                    <View className='space-y-4 md:space-y-6'>
                        <Text>Please enter your new password here</Text>
                        <View>
                            <Text className='block mb-2 text-sm font-medium text-gray-900'>Password</Text>
                            <TextInput
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                placeholder="••••••••"
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                        <TouchableOpacity className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onPress={() => {
                            // console.log("Local:", local, "Global:", glob);
                            if (!password) return ToastAlert("Error", "Please enter a valid password!")
                            handleResetPassword();
                        }}>
                            {
                                isPending ?
                                    <ActivityIndicator color={"white"} /> :
                                    <Text className='text-white text-center'>Reset</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ResetPasswordScreen