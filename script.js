let users = []; // Array per memorizzare gli utenti
let appointments = []; // Array per gli appuntamenti

// Funzione per fare il login
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Verifica che l'utente esista
    let user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        // Se è un cliente
        if (user.role === "customer") {
            showCustomerPage();
        } else if (user.role === "admin") {
            showAdminPage();
        }
    } else {
        alert("Username o password errati!");
    }
}

// Funzione per registrare un nuovo utente
function register() {
    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    
    // Aggiungi un nuovo utente
    let newUser = {
        username: username,
        password: password,
        role: "customer" // Imposta il ruolo come cliente per default
    };
    users.push(newUser);
    alert("Registrazione completata!");
    showLoginForm();
}

// Funzione per visualizzare la pagina di login
function showLoginForm() {
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("registrationPage").style.display = "none";
}

// Funzione per visualizzare la pagina di registrazione
function showRegistrationForm() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("registrationPage").style.display = "block";
}

// Funzione per visualizzare la pagina per il cliente (prenotazione)
function showCustomerPage() {
    document.getElementById("calendarPage").style.display = "block";
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("adminPage").style.display = "none";

    // Carica gli slot disponibili
    loadAvailableSlots();
}

// Funzione per visualizzare la pagina per l'admin (gestione calendario)
function showAdminPage() {
    document.getElementById("calendarPage").style.display = "none";
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("adminPage").style.display = "block";

    // Carica gli appuntamenti prenotati
    loadAdminSlots();
}

// Funzione per fare il logout
function logout() {
    document.getElementById("calendarPage").style.display = "none";
    document.getElementById("adminPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

// Funzione per caricare gli slot disponibili per il cliente
function loadAvailableSlots() {
    let slotsList = document.getElementById("slotsList");
    slotsList.innerHTML = ''; // Pulisce la lista

    let slots = [
        '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30',
        '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ];

    slots.forEach((slot, index) => {
        let li = document.createElement("li");
        li.textContent = slot;

        // Aggiungi un pulsante per prenotare
        let button = document.createElement("button");
        button.textContent = "Prenota";
        button.onclick = () => bookAppointment(index);

        li.appendChild(button);
        slotsList.appendChild(li);
    });
}

// Funzione per prenotare un appuntamento
function bookAppointment(slotIndex) {
    let selectedSlot = [
        '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30',
        '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ][slotIndex];

    // Verifica se l'appuntamento è già prenotato
    if (appointments.includes(selectedSlot)) {
        alert("Questo slot è già prenotato.");
    } else {
        appointments.push(selectedSlot);
        alert("Appuntamento prenotato per " + selectedSlot);
    }
}

// Funzione per caricare gli appuntamenti per l'admin
function loadAdminSlots() {
    let adminSlotsList = document.getElementById("adminSlotsList");
    adminSlotsList.innerHTML = '';

    appointments.forEach(slot => {
        let li = document.createElement("li");
        li.textContent = slot;
        adminSlotsList.appendChild(li);
    });
}
