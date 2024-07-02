import ToastAlert from '@/components/ToastAlert';
import { authUserLogin } from '@/services/auth.service';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import * as Linking from "expo-linking";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const router = useRouter()

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

    const handleLogin = async () => {
        // Linking.openURL('myapp://dev/auth/signup')
        // return;
        if (emailError || passwordError) return ToastAlert("Error", "Invalid data added!")
        const res = await authUserLogin(email, password);
        const resMessage = res?.message;
        ToastAlert("Alert!", resMessage);
        if (res?.status == true) {
            const accessToken = res?.data?.accessToken;
            await SecureStore.setItemAsync("token", accessToken)
            router.replace("/home")
        }
    }

    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center px-4 bg-white">
            <View className='w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0'>
                <View className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <Text className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                        Sign in to your account
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
                            {emailError ? <Text>{emailError}</Text> : null}
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
                            {passwordError ? <Text className='text-red-500'>{passwordError}</Text> : null}
                        </View>
                        <View className='flex items-center justify-end'>
                            <TouchableOpacity onPress={() => router.push("/auth/resetPassword")}>
                                <Text className='text-sm font-normal text-primary-600 hover:underline'>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onPress={() => handleLogin()}>
                            <Text className='text-white text-center'>Sign in</Text>
                        </TouchableOpacity>
                        <View className='text-sm font-light text-gray-500 flex items-center'>
                            <Text>
                                Don’t have an account yet?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                                <Text className='font-medium text-primary-600 hover:underline'>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
