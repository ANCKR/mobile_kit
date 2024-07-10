import * as React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useRouter } from "expo-router"
import ImageUploader from "@/components/ImagePicker";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { notificationHandle, sendNotification } from "@/services/notification.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { allUsersData } from "@/services/user.service";
import { downloadFileFromServer } from "@/services/upload.service";
import RazorpayCheckout from 'react-native-razorpay';
// import CameraImageUploader from '@/components/ImageCamera';
import Modal from "react-native-modal"
import { StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from 'react-native';

const HomeScreen = () => {
    const router = useRouter();
    const [imageUri, setImageUri] = useState(null);
    const [status, setStatus]: any = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [facing, setFacing]: any = useState('back');
    const [cameraRef, setCameraRef] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const [permission, requestPermission] = useCameraPermissions();

    // if (!permission) {
    //     // Camera permissions are still loading.
    //     return <View />;
    // }

    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            setCapturedImage(photo.uri);
            console.log({ photo })
            await SecureStore.setItemAsync("photoUri", photo.uri);
        }
    };

    // if (!permission.granted) {
    //     // Camera permissions are not granted yet.
    //     return (
    //         <View style={styles.container}>
    //             <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
    //             <Button onPress={requestPermission} title="grant permission" />
    //         </View>
    //     );
    // }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("token");
        router.replace("/auth/welcome")
        return;
    }

    const handleSendNotification = async () => {
        const fcmToken = await SecureStore.getItemAsync("fcmToken");
        const res = await sendNotification({
            token: fcmToken,
            body: "Body",
            title: "Title"
        });
    }

    useEffect(() => {
        notificationHandle()
    }, [])

    const { isLoading: isLoadingUsers, data: allUsers } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await allUsersData();
            return res?.data;
        }
    })

    const { isPending: isDownloadingImage, mutate: handleDownloadImage } = useMutation({
        mutationKey: ['download-file'],
        mutationFn: async () => {
            const res = await downloadFileFromServer();
            return res?.data
        },
        onSuccess: async (data) => {
            // const imageUrl = 'https://via.placeholder.com/150';

            // // Get permissions to save the image
            // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            // if (status !== 'granted') {
            //     alert('Permission to access media library is required!');
            //     return;
            // }

            // // Define file URI to save the image
            // const fileUri = FileSystem.documentDirectory + 'downloadedImage.jpg';

            // // Download the image
            // const { uri }: any = await FileSystem.downloadAsync(imageUrl, fileUri);
            // console.log({ uri });
            // setImageUri(uri);

            // // Save the image to the media library
            // const asset = await MediaLibrary.createAssetAsync(uri);
            // await MediaLibrary.createAlbumAsync('Download', asset, false);

            // console.log('Image downloaded and saved to media library!');
            // setStatus('Image downloaded and saved to media library!');
        }
    })

    const renderItem = ({ item }: any) => (
        <View className={'flex-row items-center p-4 border-b border-gray-200'}>
            <Image source={{ uri: item['user.image'] }} className={'w-16 h-16 rounded-full mr-4'} />
            <Text className={'text-lg font-semibold'}>{item['user.username']}</Text>
        </View>
    );

    return (
        <SafeAreaView className="pt-8 bg-white h-full">
            <StatusBar />
            {/* <View className='flex-row justify-between items-center px-4 h-16 bg-white border-b border-gray-300'>
                <Text className='text-lg font-bold'>Mobile Kit</Text>
                <TouchableOpacity onPress={() => handleLogout()}>
                    <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
            </View> */}

            <ImageUploader />
            {/* <CameraImageUploader /> */}

            <ScrollView className=''>
                <View className="bg-white h-full px-2 pb-40">
                    {/* <Text className="text-black text-2xl font-semibold my-4">Welcome to Mobile Kit</Text>
                    <View className="px-8">
                        <ImageUploader />
                    </View> */}

                    <View className={'flex-1 bg-gray-100 mt-8'}>
                        <Text className='font-bold text-2xl text-gray-700'>Users ({allUsers?.length ?? 0})</Text>
                        <FlatList
                            data={allUsers}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    </View>

                    {imageUri && <Image source={{ uri: imageUri }} className={'w-40 h-40 mt-4'} />}
                    {status && <Text className={'text-center text-lg mt-4'}>{status}</Text>}

                    <TouchableOpacity className="bg-blue-400 p-4 rounded mt-4" onPress={() => handleSendNotification()}>
                        <Text className="text-white">Send Notification</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-blue-400 p-4 rounded mt-4" onPress={() => {
                        var options = {
                            description: 'Credits towards consultation',
                            image: 'https://i.imgur.com/3g7nmJC.png',
                            currency: 'INR',
                            key: 'rzp_test_Me8ye8QX9cfQKm',
                            amount: '5000',
                            name: 'Mobile Kit',
                            prefill: {
                                email: 'void@razorpay.com',
                                contact: '9191919191',
                                name: 'Razorpay Software'
                            },
                            theme: { color: '#F37254' }
                        }
                        RazorpayCheckout.open(options).then((data: any) => {
                            // handle success
                            alert(`Success: ${data.razorpay_payment_id}`);
                        }).catch((error: any) => {
                            // handle failure
                            alert(`Error: ${error.code} | ${error.description}`);
                        });
                    }}>
                        <Text className="text-white">Payment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-blue-400 p-4 rounded mt-4" onPress={() => {
                        // router.push("/camera")
                        setIsModalOpen(true)
                    }}>
                        <Text className="text-white">Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-blue-400 p-4 rounded mt-4" onPress={() => handleLogout()}>
                        <Text className="text-white">Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal isVisible={isModalOpen}>
                <View className='bg-white'>
                    <Text>I am the modal content!</Text>
                    <View style={styles.container}>
                        <CameraView style={styles.camera} facing={facing} ref={ref => setCameraRef(ref)}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                    <Text style={styles.text}>Flip Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={takePicture}>
                                    <Text style={styles.text}>Capture</Text>
                                </TouchableOpacity>
                            </View>
                        </CameraView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});