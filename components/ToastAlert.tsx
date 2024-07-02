import { Alert } from "react-native"

const ToastAlert = (title: string, description: string) => {
    return (
        Alert.alert(
            title,
            description,
            [
                {
                    text: 'Cancel',
                    // onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        'This alert was dismissed by tapping outside of the alert dialog.',
                    ),
            },
        )
    )
}

export default ToastAlert 