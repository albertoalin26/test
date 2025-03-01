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

// PRENOTA UN APPUNTAMENTO
function bookAppointment() {
    const user = auth.currentUser;
    const appointmentTime = document.getElementById("appointment-time").value;

    if (!user) {
        alert("Effettua il login per prenotare.");
        return;
    }

    db.collection("appointments").add({
        userId: user.uid,
        dateTime: appointmentTime
    }).then(() => {
        alert("Appuntamento prenotato!");
        loadAppointments();
    }).catch(error => console.error("Errore:", error));
}

// MOSTRA GLI APPUNTAMENTI
function loadAppointments() {
    const user = auth.currentUser;
    const appointmentsList = document.getElementById("appointments-list");
    appointmentsList.innerHTML = "";

    db.collection("appointments").where("userId", "==", user.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const li = document.createElement("li");
                li.textContent = doc.data().dateTime;
                appointmentsList.appendChild(li);
            });
        });
}

// LOGOUT
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}

// CONTROLLA L'ACCESSO DELL'UTENTE
auth.onAuthStateChanged(user => {
    if (user) {
        loadAppointments();
    } else {
        window.location.href = "index.html";
    }
});

