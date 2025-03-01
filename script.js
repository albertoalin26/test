// Riferimenti agli elementi DOM
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginRegisterSection = document.getElementById("login-register-section");
const dashboardSection = document.getElementById("dashboard-section");
const userEmailDisplay = document.getElementById("user-email");
const logoutBtn = document.getElementById("logoutBtn");

// Funzione per registrare un utente
registerBtn.addEventListener("click", async () => {
    const email = emailField.value;
    const password = passwordField.value;
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        alert("Registrazione completata con successo!");
        // Salva l'utente nel database Firestore
        await firestore.collection('Users').doc(user.uid).set({
            email: user.email
        });
    } catch (error) {
        alert(error.message);
    }
});

// Funzione per effettuare il login
loginBtn.addEventListener("click", async () => {
    const email = emailField.value;
    const password = passwordField.value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showDashboard();
    } catch (error) {
        alert(error.message);
    }
});

// Funzione per mostrare la dashboard
function showDashboard() {
    loginRegisterSection.style.display = "none";
    dashboardSection.style.display = "block";
    const user = auth.currentUser;
    userEmailDisplay.textContent = user.email;
}

// Funzione per fare il logout
logoutBtn.addEventListener("click", () => {
    auth.signOut();
    loginRegisterSection.style.display = "block";
    dashboardSection.style.display = "none";
});

// Funzione di ascolto per quando l'utente è autenticato
auth.onAuthStateChanged(user => {
    if (user) {
        showDashboard();
    } else {
        loginRegisterSection.style.display = "block";
        dashboardSection.style.display = "none";
    }
});
