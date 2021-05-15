// Firebase
import fb from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Configs
import config from 'src/config/config';

export const firebase = fb.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
