import ApiClient from "@/utils/axios.util";

const uploadImageToServer = async (formData: any) => {
    const res = await ApiClient.post('/uploadFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).catch((err: any) => {
        console.log({ error: err?.response })
        console.log({ errorHeaders: err?.response?.responseHeaders })
        return err?.response
    })
    return res?.data;
}

export {
    uploadImageToServer
}