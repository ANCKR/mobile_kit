import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = `https://3000-idx-expresskit-1719903514996.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev`
const ACCESS_TOKEN = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWV4cHJlc3NraXQtMTcxOTkwMzUxNDk5Ni5jbHVzdGVyLTNnNHNjeHQybmpkZDZ1b3ZrcXlmY2FiZ282LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyMDQyODk4MiwiZXhwIjoxNzIwNDMyNTgyfQ.IYd_81SMhx_e0JwHV3Y-SzAvNlqziYVHStNrmwkIU83pjk1uvAz3xeu_N1zsC8DSWOca-akKcwcAaW1WTu_JxVMG1Uu1uScOe7PvEV-H_yA_kNOUblFUgh4i7KIVOeeoeumwaRzqk3PlOC5bQJz_OUhqcDBrRbpZWXvQ3O_AmGjScf9J0wb8JH8VXt3KNnvDGK1XSMEgx3v59teBvgIeO-bJw5I5dq5QR0mxPUAO5Miz7qMgv0LaTIKv9ul_8uVrjHoLYacoa12t0vR7vGv1ImE8jvUeenvggc4QulYepVT591L7KvVVVQ7Y9XO0_JnvH5lGeYXDJ1rD6yJa_Nb0QQ`

const ApiClient: any = axios.create({
    baseURL: `${BASE_URL}/api`,
    withCredentials: true
})

ApiClient.interceptors.request.use(async (request: any) => {
    const localAccessToken = await SecureStore.getItemAsync("token");
    const localRefreshToken = await SecureStore.getItemAsync("refreshToken");
    console.log({localAccessToken, localRefreshToken})
    const accessToken = ACCESS_TOKEN ?? localAccessToken;
    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`
    }
    if (localRefreshToken) {
        request.headers.Cookie = JSON.stringify({
            accessToken: localAccessToken,
            refreshToken: localRefreshToken
        })
    }

    return request;
})

export default ApiClient