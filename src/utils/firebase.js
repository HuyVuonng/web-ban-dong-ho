// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCZet-Z0nObrxeOwDjgvWAMXpo3gQJ8zLI',
    authDomain: 'webbandongho-91eee.firebaseapp.com',
    projectId: 'webbandongho-91eee',
    storageBucket: 'webbandongho-91eee.appspot.com',
    messagingSenderId: '258186288702',
    appId: '1:258186288702:web:f81e4828e995607066fb6f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imgToDb = getStorage(app);
