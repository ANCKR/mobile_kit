import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCVLdVVoa21WWZq7r84J4fDaVIjgh5i_Vk",
    authDomain: "new-project-c6bde.firebaseapp.com",
    projectId: "new-project-c6bde",
    storageBucket: "new-project-c6bde.appspot.com",
    messagingSenderId: "1079200890029",
    appId: "1:1079200890029:web:fea07fecad3ebb2a4e1a24"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export {
    db
}