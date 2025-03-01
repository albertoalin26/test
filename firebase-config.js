// Configurazione Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCg2TyyTs4NcUS-vkiWA4fsaf0zcSO2mKo",
    authDomain: "app-achi.firebaseapp.com",
    projectId: "app-achi",
    storageBucket: "app-achi.firebasestorage.app",
    messagingSenderId: "100832059727",
    appId: "1:100832059727:web:0ca9b6062d52a2745a653a"
};

// Inizializza Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
