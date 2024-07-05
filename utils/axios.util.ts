import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = `https://3000-idx-expresskit-1719903514996.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev`
const ACCESS_TOKEN = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWV4cHJlc3NraXQtMTcxOTkwMzUxNDk5Ni5jbHVzdGVyLTNnNHNjeHQybmpkZDZ1b3ZrcXlmY2FiZ282LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyMDE3NTE2MCwiZXhwIjoxNzIwMTc4NzYwfQ.fhzvFt_DanP27K0Z1Urd1f5UIMsumFSSRWbVODUgjeEPrUimTdRr2l5uzeyaQEUtny5ZvDuVV2my9V-omzmwMTk5mxd5F5qMB-eLepNGUx6MAl5AyYMa57-wgo0ymO9AfpuutbF87EQ_4PeMGFsZjC9riYNSGXrDa2xaGlZFBll1811jLeeGycT1imAEFDKm5trD9kXNu719GT3Q2iiuuEqXThS1O_yzRWM5Ku1vH_fz3-c9TkHfqzbiRjoM4ne91_j--iNAbnPvCz_5TnDWgTfapopVTI7zfQuhs1NQH9KNPMIutsy6DGPCwbmtkPbkaIrxIVmjL5bEsLDpzDY7-A`

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