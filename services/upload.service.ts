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

const uploadBase64ToServer = async (formData: any) => {
    const res = await ApiClient.post('/uploadFileBase64', formData)
        .catch((err: any) => {
            console.log({ error: err?.response })
            return err?.response
        })
    return res?.data;
}

const downloadFileFromServer = async () => {
    const res = await ApiClient.get('/downloadFile')
        .catch((err: any) => {
            console.log({ error: err?.response })
            return err?.response
        })
    return res?.data;
}


export {
    uploadImageToServer,
    uploadBase64ToServer,
    downloadFileFromServer
}