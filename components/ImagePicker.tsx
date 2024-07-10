import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { uploadBase64ToServer, uploadImageToServer } from '@/services/upload.service';
import { useMutation } from '@tanstack/react-query';
import ToastAlert from './ToastAlert';

export default function ImageUploader() {
    const [image, setImage] = useState(null);
    const [uploadedImageData, setUploadedImageData]: any = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUploadedImageData(result.assets[0]);
            const fileUri = result.assets[0].uri;
        }

    };

    const { isPending, data: uploadedImgResponse, mutate: uploadImageToServerHandle } = useMutation({
        mutationKey: ['upload-image'],
        mutationFn: async () => {
            const fileBase64 = uploadedImageData?.base64;
            const fileName = uploadedImageData?.fileName;

            const res = await uploadBase64ToServer({
                image: fileName,
                base64: fileBase64
            });

            return res;
        },
        onSuccess: (data) => {
            const resMessage = data?.message;
            ToastAlert("Alert", resMessage);
            setImage(null);
            setUploadedImageData(null);
        }
    })

    return (
        // <View className='border-2 border-gray-200 rounded w-full flex flex-col space-y-4 px-4 py-10 justify-center items-center'>
        //     <Ionicons name='cloud-upload' size={30} />
        //     <Text>Upload Image</Text>
        //     {image && <Image source={{ uri: image }} style={styles.image} />}
        //     <TouchableOpacity className='bg-blue-500 rounded py-3 px-5' onPress={async () => {
        //         if (isPending) return;
        //         if (image) {
        //             await uploadImageToServerHandle();
        //         } else {
        //             pickImage();
        //         }
        //     }}>
        //         <Text className='text-white'>
        //             {
        //                 isPending ? "Please wait..." : image ? "Upload Image" : "Pick Image"
        //             }
        //         </Text>
        //     </TouchableOpacity>
        //     {
        //         image && (
        //             <TouchableOpacity className='bg-blue-500 rounded py-3 px-5' onPress={() => {
        //                 setImage(null);
        //                 setUploadedImageData(null);
        //             }}>
        //                 <Text className='text-white'>Remove Image</Text>
        //             </TouchableOpacity>
        //         )
        //     }
        // </View>
        <>
            <View className='bg-blue-900 flex flex-col justify-center items-center py-10 h-1/2'>
                {image ? <Image source={{ uri: image }} style={styles.image} />
                    :
                    <Ionicons name='document' color={"white"} size={150} />
                }
                <Text className='text-xl text-white font-bold mt-4'>
                    {
                        image ? `${uploadedImageData?.fileName?.slice(0,20)}...` : "Upload Image"
                    }
                </Text>
                <Text className='text-xs mt-2 text-gray-200'>Upload any image from your device gallery</Text>
                {
                    image && <TouchableOpacity className='mt-6' onPress={() => {
                        setImage(null);
                        setUploadedImageData(null);
                    }}>
                        <Text className='text-gray-300'>Remove Image</Text>
                    </TouchableOpacity>
                }
            </View>
            <TouchableOpacity className='bg-yellow-600 w-1/2 rounded-xl py-4 items-center self-center -mt-8 flex items-center' onPress={async () => {
                if (isPending) return;
                if (image) {
                    await uploadImageToServerHandle();
                } else {
                    pickImage();
                }
            }}>
                <Ionicons name='image' color={"white"} size={20} />
                <Text className='text-white text-lg font-bold'>
                    {
                        isPending ? "Please wait..." : image ? "Upload Image" : "Pick Image"
                    }
                </Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});