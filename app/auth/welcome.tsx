import { useRouter } from "expo-router"
import React from "react"
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"

const IndexAuth = () => {
    const router = useRouter()
    return (
        <SafeAreaView className="bg-white h-full py-6 space-y-4">
            <View className="h-1/2 px-2">
                <Text className="text-2xl font-semibold text-center mt-10 mb-7 text-gray-700">Welcome to Mobile Kit</Text>
                <Image source={{ uri: "https://dms.mydukaan.io/original/jpeg/6083934/78831637-ef20-421b-99d7-a1630411d8ed/pr5628722470-image3-92-95a4a152-fb73-4e83-ac87-4d3366ed588d.png" }} className="h-full w-full rounded" />
            </View>
            <View className="px-4 h-1/2 flex flex-col justify-end items-center space-y-2 pb-6">
                <TouchableOpacity className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-4 text-center' onPress={() => router.push("/auth/login")}>
                    <Text className='text-white text-center text-sm font-bold'>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity className='w-full text-white border border-blue-600 font-medium rounded-lg text-sm px-5 py-4 text-center' onPress={() => router.push("/auth/signup")}>
                    <Text className='text-black text-center text-sm font-bold'>Register</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default IndexAuth