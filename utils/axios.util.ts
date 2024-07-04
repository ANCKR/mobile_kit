import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = `https://3000-idx-expresskit-1719903514996.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev`
const ACCESS_TOKEN = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWV4cHJlc3NraXQtMTcxOTkwMzUxNDk5Ni5jbHVzdGVyLTNnNHNjeHQybmpkZDZ1b3ZrcXlmY2FiZ282LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyMDA4NTAyMiwiZXhwIjoxNzIwMDg4NjIxfQ.f8jE4iZ9Yt21j0TZEEzwQdCmq5HfhZZx5ak8XBdfE35Xd8eGwKFIM72XL4bLqd0VGqAgW6jI9jUGvDJhSd4XrV1Bn15pAvapFXIkh_78IidNWnv1abGf1ggC7K_K7kzcoEZ66c4WttI8JzqeBmR4DFAoebSY7KVvz34J58ch1MmeFOX7yqFwatyVx_shYSuFtUKDujHWeBUpWXR84ERLW4BrjKaTjvdrzwwFCzqZnw8kJCxwRc5pvNOnCK_6ijeqd307SMXRlezVDw-yjIgt6BqjjUXkT4Uj-gT36tHpDUcZYN5D2Ig8gQfL7mhFKm2flk7KkqX3wFnv332JHPNLPQ`

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