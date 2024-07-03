import ToastAlert from '@/components/ToastAlert';
import { authForgotPassword } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, Button, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function ForgotPsswordScreen() {
    const [email, setEmail] = useState("");

    const { isPending, data, mutate: handleForgotPassword } = useMutation({
        mutationKey: ['forgot-password'],
        mutationFn: async () => {
            const res = await authForgotPassword(email)
            console.log({ res })
            return res;
        },
        onSuccess: (data) => {
            const resMessage = data?.message;
            ToastAlert("Success", resMessage);
        }
    })

    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center px-4 bg-white">
            <View className='w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0'>
                <View className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <Text className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                        Forgot Password
                    </Text>
                    <View className='space-y-4 md:space-y-6'>
                        <Text>Please enter your email for reseting your password</Text>
                        <View>
                            <Text className='block mb-2 text-sm font-medium text-gray-900'>Your email</Text>
                            <TextInput
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                placeholder="name@company.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <TouchableOpacity className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onPress={() => handleForgotPassword()}>
                            {
                                isPending ?
                                    <ActivityIndicator color={"white"} /> :
                                    <Text className='text-white text-center'>Send Code</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}