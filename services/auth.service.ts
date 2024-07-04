import ApiClient from "@/utils/axios.util"

const authUserLogin = async (email: string, password: string) => {
    /**
     * for REST
     */
    const res = await ApiClient.post('/signin', {
        username: email,
        password
    }).catch((err: any) => {
        console.log({ error: err?.response })
        return err?.response
    })
    return res?.data;

    /***
     * For graphql
     */

    // const res = await ApiClient.post("/graphql",
    //     {
    //         "query": "mutation SignIn($username: String!, $password: String!) { signIn(username: $username, password: $password) { message token } }",
    //         "variables": {
    //             "username": "testuser3@example.com",
    //             "password": "Mayank@123"
    //         }
    //     }
    // ).catch((err: any) => {
    //     console.log({ error: err?.response })
    //     return err?.response
    // })

    // console.log({res})

    // return res?.data;
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

const authResetPassword = async (uuid: any, password: string) => {
    const res = await ApiClient.post('/reset-password', {
        uuid,
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