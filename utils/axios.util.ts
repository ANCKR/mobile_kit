import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = `https://3000-idx-expresskit-1719903514996.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev`
const ACCESS_TOKEN = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWV4cHJlc3NraXQtMTcxOTkwMzUxNDk5Ni5jbHVzdGVyLTNnNHNjeHQybmpkZDZ1b3ZrcXlmY2FiZ282LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcxOTk4MDY1MiwiZXhwIjoxNzE5OTg0MjUyfQ.uMQrHWZZdgQc4WBcCk6mJyGYmBVfiIE23KO5M44Y76wosx1abJo5ac_omi0BmrD-kZVR6WOFOIebWFsiQaMgSaTwAKzKh5T7J6188YJiujZQWHhXd3RlxjO26WBa9kjwODSo2HhBnU7Gob_zfpfj5Y-1Cdxnj0BTCVduWC7BxKwcivUmQmTifPoMNLe6TIznBeyNTANDVj27DDQS7QLV1UiKlSZepfXMsu_wG-uojKUDugi2z_7rtOXwtRVOcSVScjfipXK1kYdhANKPnrwTBgTeBRK5SLDG40CO9ilRNjUMgj8y8PGFw6T7PMYv7Knz2lkXDYhBb1uB7rNZ1W9xhA`

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