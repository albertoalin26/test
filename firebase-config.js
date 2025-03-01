// Configurazione Firebase
const firebaseConfig = {
    apiKey: "LA_TUA_API_KEY",
    authDomain: "il-tuo-progetto.firebaseapp.com",
    projectId: "il-tuo-progetto",
    storageBucket: "il-tuo-progetto.appspot.com",
    messagingSenderId: "IL_TUO_SENDER_ID",
    appId: "LA_TUA_APP_ID"
};

// Inizializza Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
