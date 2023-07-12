// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
