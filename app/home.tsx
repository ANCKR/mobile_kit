import { SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useRouter } from "expo-router"
import ImageUploader from "@/components/ImagePicker";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { notificationHandle } from "@/services/notification.service";

const HomeScreen = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("token");
        router.replace("/auth/login")
        return;
    }

    useEffect(() => {
        notificationHandle()
    }, [])

    return (
        <SafeAreaView className="pt-8">
            <StatusBar />
            <View className='flex-row justify-between items-center px-4 h-16 bg-white border-b border-gray-300'>
                <Text className='text-lg font-bold'>Mobile Kit</Text>
                <TouchableOpacity onPress={() => handleLogout()}>
                    <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View className="bg-white h-full px-2">
                <Text className="text-black text-2xl font-semibold my-4">Welcome to Mobile Kit</Text>
                <View className="px-8">
                    <ImageUploader />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen