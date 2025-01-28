// Simuliamo un database di utenti (per test)
const users = JSON.parse(localStorage.getItem('users')) || [];

// Funzione per gestire la registrazione
function register(username, email, password) {
    const existingUser = users.find(u => u.username === username || u.email === email);
    
    if (existingUser) {
        alert('Nome utente o email già registrati.');
        return null;
    }
    
    const newUser = { username, email, password, role: 'cliente' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registrazione avvenuta con successo!');
    return newUser;
}

// Funzione per gestire il login
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        alert('Nome utente o password errati.');
        return null;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

// Funzione per gestire il logout
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html'; // Reindirizza alla pagina di login
}

// Gestione della registrazione
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = register(username, email, password);

        if (user) {
            // Dopo la registrazione, login automatico
            localStorage.setItem('user', JSON.stringify(user)); // Salviamo l'utente nel localStorage
            window.location.href = 'index.html'; // Redirigiamo alla pagina principale
        }
    });
}

// Gestione del login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = login(username, password);

        if (user) {
            // Reindirizza alla pagina principale se il login è riuscito
            window.location.href = 'index.html'; 
        }
    });
}

// Verifica se l'utente è loggato
function checkIfLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        window.location.href = 'login.html'; // Se non è loggato, reindirizza al login
    } else {
        // Se l'utente è loggato, mostra il benvenuto
        document.getElementById('welcome').textContent = `Benvenuto ${user.username}`;
        if (user.role === 'admin') {
            // Mostra il calendario se l'utente è admin
            document.getElementById('calendar').style.display = 'block';
        } else {
            // Mostra solo l'opzione di prenotazione per i clienti
            document.getElementById('booking').style.display = 'block';
        }
    }
}

// Quando la pagina è caricata, controlla se l'utente è loggato
if (document.getElementById('welcome')) {
    checkIfLoggedIn();
}

// Funzione per prenotare un appuntamento
function bookAppointment() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        alert('Devi essere loggato per prenotare un appuntamento.');
        return;
    }

    // Prenotazione di esempio (per test)
    alert(`Prenotazione effettuata per ${user.username}`);
}

// Gestione della prenotazione
const bookingButton = document.getElementById('book-button');
if (bookingButton) {
    bookingButton.addEventListener('click', function() {
        bookAppointment();
    });
}
