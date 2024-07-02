import axios from "axios";

const BASE_URL = `https://3000-idx-expresskit-1719903514996.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev`
const ACCESS_TOKEN = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWV4cHJlc3NraXQtMTcxOTkwMzUxNDk5Ni5jbHVzdGVyLTNnNHNjeHQybmpkZDZ1b3ZrcXlmY2FiZ282LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcxOTkxMjY1OSwiZXhwIjoxNzE5OTE2MjU5fQ.ZlxdNhWpvwCz9mjPX4--mFsj6eJ4BGu59suvpcuaEdAQmlEP5wJ2AhAzIy_igBoNCOqooJ-RGy5bTI6qluHb3BOBxkt3t5X_cyw4a9Zv2oazs1pncwbNByQBnEiOcxAKDEmxYZhmzos6p5WtxP0tsleqB9paoNMlGA2JkugjlSGgU14GqJH-rKO8iRnoK2oHetXvqOPTQjN7AqTtYvzgIsezUL0uc8PdbGJNbeYGPqChXRRJbKdY7UYI18BA1yOeqj5QdbRLyy1jRPjBm6tGWVcc53DVHAh2VH34EUmrfMdvI6K5bUAD693leiniZ1EsAHcFzDBf0LCtdGicPeeLtg`

const ApiClient: any = axios.create({
    baseURL: `${BASE_URL}/api`,
})

ApiClient.interceptors.request.use(async (request: any) => {
    const accessToken = ACCESS_TOKEN;
    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`
    }

    return request;
})

export default ApiClient