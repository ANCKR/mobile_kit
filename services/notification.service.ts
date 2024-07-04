import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { Alert, ToastAndroid } from "react-native";
import ApiClient from "@/utils/axios.util";
import * as SecureStore from "expo-secure-store"
import Toast from 'react-native-toast-message';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const requestPermission: any = async () => {
    const authStatus = await messaging().requestPermission();
    const notificationStatus = await checkNotificationPermission();
    if (notificationStatus == "undetermined" || notificationStatus == "denied") {
        // await requestNotificationPermission()
        await Notifications.requestPermissionsAsync();
    } else if (notificationStatus == "granted") {
    } else {
        Alert.alert(
            "Permission Denied",
            "Please enable notification permission in device settings to receive notifications.",
            [{ text: "OK" }]
        );
    }
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log("Authorization status:", authStatus);
    }
};

const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
};

const notificationHandle = async () => {
    let fcmToken = "";

    if (requestPermission()) {
        messaging()
            .getToken()
            .then(async (token) => {
                console.log({ token })
                await SecureStore.setItemAsync("fcmToken", token);
                fcmToken = token;
                //   await SecureStore.setItemAsync("fcm_token", token);
            });
    }

    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    "Notification caused app to open from quit state:",
                    remoteMessage.notification
                );
            }
        });

    // Handle user opening the app from a notification (when the app is in the background)
    messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
            "Notification caused app to open from background state:",
            remoteMessage.notification
        );
    });

    // Handle push notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        // Alert.alert(
        //     `${remoteMessage.notification?.title}`,
        //     `${remoteMessage.notification?.body}`
        // );
        Toast.show({
            type: 'info',
            text1: remoteMessage.notification?.title,
            text2: remoteMessage.notification?.body
        });
    });

    // Clean up the event listeners
    return {
        token: fcmToken,
        unsubscribe,
    };
};

const sendNotification = async (payload: any) => {
    const res = await ApiClient.post('/userNotification', payload)
        .catch((err: any) => {
            console.log({ error: err?.response })
            console.log({ errorHeaders: err?.response?.responseHeaders })
            return err?.response
        })
    return res?.data;
}

export {
    notificationHandle,
    sendNotification
};