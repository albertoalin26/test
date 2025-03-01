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
const db = firebase.firestore();

// Riferimenti agli elementi del DOM
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const dashboard = document.getElementById("dashboard");
const appContainer = document.getElementById("app");
const logoutButton = document.getElementById("logout-button");

// Gestione login
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showDashboard();
    } catch (error) {
        alert(error.message);
    }
});

// Gestione registrazione
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        // Salviamo l'utente in Firestore
        const user = auth.currentUser;
        await db.collection("Users").doc(user.uid).set({
            email: email
        });
        alert("Registrazione riuscita!");
        showDashboard();
    } catch (error) {
        alert(error.message);
    }
});

// Mostra la pagina di login
loginLink.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
});

// Mostra la pagina di registrazione
registerLink.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
});

// Mostra il dashboard dell'utente
function showDashboard() {
    appContainer.style.display = "none";
    dashboard.style.display = "block";
}

// Logout
logoutButton.addEventListener("click", async () => {
    try {
        await auth.signOut();
        appContainer.style.display = "block";
        dashboard.style.display = "none";
    } catch (error) {
        alert(error.message);
    }
});

// Verifica se l'utente è già loggato
auth.onAuthStateChanged((user) => {
    if (user) {
        showDashboard();
    } else {
        appContainer.style.display = "block";
        dashboard.style.display = "none";
    }
});
