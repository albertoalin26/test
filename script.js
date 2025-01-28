// Simuliamo un database di utenti (admin, clienti)
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'cliente', password: 'cliente123', role: 'cliente' }
];

// Array per memorizzare gli appuntamenti prenotati
const appointments = [];

// Funzione per gestire il login
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    return user ? user : null;
}

// Funzione per gestire la prenotazione
function bookAppointment(dateTime, name, email) {
    const appointment = { dateTime, name, email };
    appointments.push(appointment);
}

// Funzione per creare gli slot di 30 minuti
function createSlots() {
    const slots = [];
    const start = new Date();
    start.setHours(9, 0, 0, 0); // Iniziamo dalle 9:00

    for (let i = 0; i < 8; i++) { // Genera 8 slot di 30 minuti
        const slot = new Date(start);
        slot.setMinutes(slot.getMinutes() + i * 30);
        slots.push(slot);
    }

    return slots;
}

// Funzione per visualizzare il calendario
function renderCalendar() {
    const slots = createSlots();
    const slotSelect = document.getElementById('appointment-slot');
    slotSelect.innerHTML = '';

    slots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot.toLocaleString();
        option.textContent = slot.toLocaleTimeString();
        slotSelect.appendChild(option);
    });
}

// Gestione del login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = login(username, password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Salviamo l'utente nel localStorage
        window.location.href = 'index.html'; // Redirigiamo alla pagina principale
    } else {
        alert('Credenziali errate!');
    }
});

// Funzione per gestire la visualizzazione della sezione in base al ruolo
function displayUserInterface() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        document.getElementById('user-name').textContent = user.username;

        if (user.role === 'admin') {
            document.getElementById('admin-section').style.display = 'block';
            renderCalendar();
        } else {
            document.getElementById('customer-section').style.display = 'block';
        }
    } else {
        window.location.href = 'login.html'; // Se l'utente non è loggato, lo rimandiamo alla pagina di login
    }
}

// Funzione per gestire la prenotazione dell'appuntamento
const appointmentForm = document.getElementById('appointment-form');
appointmentForm && appointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const dateTime = document.getElementById('appointment-slot').value;

    bookAppointment(new Date(dateTime), name, email);
    alert(`Appuntamento prenotato per ${name} il ${new Date(dateTime).toLocaleString()}`);
});

// Inizializzare l'interfaccia utente
displayUserInterface();
