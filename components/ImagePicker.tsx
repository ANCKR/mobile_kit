import { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { uploadImageToServer } from '@/services/upload.service';
import * as SecureStore from "expo-secure-store";
import * as FileSystem from 'expo-file-system';

export default function ImageUploader() {
    const [image, setImage] = useState(null);

    const base64ToBuffer = (base64: any) => {
        const binaryString = atob(base64);
        // console.log({binaryString})
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        // console.log({bytes})
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const fileUri = result.assets[0].uri;
            console.log({fileUri})
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            const fileBuffer = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const buffer = base64ToBuffer(fileBuffer);
            console.log({buffer})

            // console.log({ fileBuffer, fileInfo })
            const formData: any = new FormData();
            // formData.append('image', {
            //     uri: result.uri,
            //     type: result.type,
            //     name: result.name,
            //     file: result.uri
            // });
            formData.append('file', {
                ...result.assets[0],
                buffer: fileBuffer
            })
            console.log({ formData: formData?._parts[0] })
            // const res = await uploadImageToServer(formData)
            // console.log({ res })
        }

    };

    return (
        <View className='border-2 border-gray-200 rounded w-full flex flex-col space-y-4 px-4 py-10 justify-center items-center'>
            <Ionicons name='cloud-upload' size={30} />
            <Text>Upload Image</Text>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity className='bg-blue-500 rounded py-3 px-5' onPress={pickImage}>
                <Text className='text-white'>
                    {
                        image ? "Upload Image" : "Pick Image"
                    }
                </Text>
            </TouchableOpacity>
        </View>
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