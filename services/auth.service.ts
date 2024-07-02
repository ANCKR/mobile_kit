import ApiClient from "@/utils/axios.util"

const authUserLogin = async (email: string, password: string) => {
    const res = await ApiClient.post('/signin', {
        username: email,
        password
    }).catch((err: any) => {
        console.log({ error: err?.response })
        return err?.response
    })
    return res?.data;
}

const authUserSignup = async (email: string, password: string) => {
    const res = await ApiClient.post('/signup', {
        username: email, 
        password
    }).catch((err: any) => {
        console.log({ error: err?.response })
        return err?.response
    })
    return res?.data;
}

const authForgotPassword = async (email: string) => {
    const res = await ApiClient.post('/forgot-password', {
        username: email, 
    }).catch((err: any) => {
        console.log({ error: err?.response })
        return err?.response
    })
    return res?.data;
}

const authResetPassword = async (email: string, password:string) => {
    const res = await ApiClient.post('/reset-password', {
        username: email,
        password
    }).catch((err: any) => {
        console.log({ error: err?.response })
        return err?.response
    })
    return res?.data;
}

export {
    authUserLogin,
    authUserSignup,
    authForgotPassword,
    authResetPassword
}