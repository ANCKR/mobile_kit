import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useRouter } from "expo-router"

const HomeScreen = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("token");
        router.replace("/auth/login")
        return;
    }

    return (
        <SafeAreaView>
            <Text className="text-black">Home page</Text>
            <TouchableOpacity className="bg-blue-500 p-4 rounded" onPress={() => handleLogout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen