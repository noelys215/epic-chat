// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyChFaZFGifJL8-NaLE_MOsJFeZ5PK2MTZ0',
	authDomain: 'epic-chat-b19a4.firebaseapp.com',
	projectId: 'epic-chat-b19a4',
	storageBucket: 'epic-chat-b19a4.appspot.com',
	messagingSenderId: '71764441880',
	appId: '1:71764441880:web:6c1bcd7fec1910cee6fc6d',
};

// Initialize Firebase
const app = getApp().length === 0 ? initializeApp(firebaseConfig) : getApp()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
