import ToastAlert from '@/components/ToastAlert';
import { authUserSignup } from '@/services/auth.service';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'

export default function SignupScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        const res = await authUserSignup(email, password);
        const resMessage = res?.message;
        ToastAlert("Alert!", resMessage);
        if (res?.status == true) {
            const accessToken = res?.data?.accessToken;
            await SecureStore.setItemAsync("token", accessToken)
            router.replace("/home")
        }
        return res;
    }

    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center px-4 bg-white">
            <View className='w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0'>
                <View className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <Text className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                        Register your account
                    </Text>
                    <View className='space-y-4 md:space-y-6'>
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

                        <TouchableOpacity className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onPress={() => handleSignup()}>
                            <Text className='text-white text-center'>Sign in</Text>
                        </TouchableOpacity>
                        <View className='text-sm font-light text-gray-500 flex items-center'>
                            <TouchableOpacity onPress={() => router.push("/auth/login")}>
                                <Text>
                                    Already a user?{' '}
                                </Text>
                                {/* <Text className='font-medium text-primary-600 hover:underline'>Login</Text> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
