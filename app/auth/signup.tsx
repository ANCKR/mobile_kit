import ToastAlert from '@/components/ToastAlert';
import { authUserSignup } from '@/services/auth.service';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Button, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { useMutation } from '@tanstack/react-query';

export default function SignupScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (text: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (text: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(text)) {
            setPasswordError(
                'Password must contain at least one uppercase letter, one number, and one special character'
            );
        } else {
            setPasswordError('');
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        validateEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        validatePassword(text);
    };

    const handleSignup = async () => {
        if (emailError || passwordError) return ToastAlert("Error", "Invalid data added!")
        await handleSignupMutate();
    }

    const { isPending, data, mutate: handleSignupMutate } = useMutation({
        mutationKey: ['forgot-password'],
        mutationFn: async () => {
            const res = await authUserSignup(email, password)
            return res;
        },
        onSuccess: async (data) => {
            const resMessage = data?.message;
            ToastAlert("Alert!", resMessage);
            if (data?.status == true) {
                const accessToken = data?.data?.accessToken;
                const refreshToken = data?.data?.refreshToken;
                await SecureStore.setItemAsync("token", accessToken)
                await SecureStore.setItemAsync("refreshToken", refreshToken)
                router.replace("/home")
            }
        }
    })

    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center px-4 bg-white">
            <View className='w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0'>
                <View className='mb-6 px-6'>
                    <Text className='font-bold text-2xl text-gray-600'>Hello! Register to get started</Text>
                </View>
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
                                onChangeText={handleEmailChange}
                            />
                            {emailError ? <Text className='text-red-500 text-xs'>{emailError}</Text> : null}
                        </View>
                        <View>
                            <Text className='block mb-2 text-sm font-medium text-gray-900'>Password</Text>
                            <TextInput
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                placeholder="••••••••"
                                secureTextEntry
                                value={password}
                                onChangeText={handlePasswordChange}
                            />
                            {passwordError ? <Text className='text-red-500 text-xs'>{passwordError}</Text> : null}
                        </View>

                        <TouchableOpacity className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onPress={() => handleSignup()}>
                            {
                                isPending ?
                                    <ActivityIndicator color={"white"} /> :
                                    <Text className='text-white text-center'>Sign Up</Text>
                            }
                        </TouchableOpacity>
                        <View className='text-sm font-light text-gray-500 flex items-center'>
                            <TouchableOpacity onPress={() => router.replace("/auth/login")}>
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
