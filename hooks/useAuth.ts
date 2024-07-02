import * as SecureStore from "expo-secure-store"

const useAuth: any = () => {
    const accessToken = SecureStore.getItem("token");
    if (accessToken) return true;
    return false;
}

export default useAuth