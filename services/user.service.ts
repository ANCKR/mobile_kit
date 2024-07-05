import ApiClient from "@/utils/axios.util";

const allUsersData = async () => {
    const res = await ApiClient.get('/alluser')
        .catch((err: any) => {
            console.log({ error: err?.response })
            return err?.response
        })
    return res?.data;
}

export {
    allUsersData
}