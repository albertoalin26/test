

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

// Inizializza Firebase Authentication
const auth = firebase.auth();

// Inizializza Firestore
const db = firebase.firestore();


// Funzione di registrazione dell'utente
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Aggiungi i dati dell'utente a Firestore
    await setDoc(doc(db, "Users", user.uid), {
      email: email,
    });
    console.log("Utente registrato con successo!");
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
  }
}

// Funzione per il login dell'utente
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log("Logged in as: ", user.email);
      // Dopo il login, puoi fare qualcosa, come redirigere l'utente a una pagina con il calendario
    })
    .catch(error => {
      console.error("Error logging in: ", error.message);
    });
}

// Funzione per recuperare i dati dell'utente
function getUserData(userId) {
  db.collection("Users").doc(userId).get()
    .then(doc => {
      if (doc.exists) {
        console.log("User data: ", doc.data());
        // Qui puoi fare qualcosa con i dati dell'utente, come visualizzare il calendario o altre informazioni
      } else {
        console.log("No such user!");
      }
    })
    .catch(error => {
      console.error("Error getting document: ", error);
    });
}

// Funzione di logout
function logoutUser() {
  auth.signOut().then(() => {
    console.log("User logged out");
    // Puoi anche redirigere l'utente alla pagina di login
  });
}

// Aggiungi eventi per form di login e registrazione
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  loginUser(email, password);
});

document.getElementById("register-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  registerUser(email, password);
});
