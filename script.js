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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// REGISTRAZIONE UTENTE
function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            alert("Registrazione completata!");
            // Salva il ruolo nel database
            db.collection("users").doc(user.uid).set({
                email: user.email,
                role: "cliente"  // Di default tutti i nuovi utenti sono clienti
            });
        })
        .catch(error => alert(error.message));
}

// LOGIN UTENTE
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            window.location.href = "dashboard.html"; // Reindirizza alla pagina principale
        })
        .catch(error => alert(error.message));
}

// LOGIN CON GOOGLE
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(userCredential => {
            const user = userCredential.user;
            window.location.href = "dashboard.html";
        })
        .catch(error => alert(error.message));
}

// CONTROLLO SE L'UTENTE È LOGGATO
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("Utente autenticato:", user.email);
    }
});
