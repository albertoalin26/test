// Array per memorizzare gli appuntamenti prenotati
const appointments = [];

// Funzione per mostrare il calendario
function renderCalendar() {
    const calendarContainer = document.getElementById("calendar");
    calendarContainer.innerHTML = '';

    const date = new Date();
    for (let i = 0; i < 7; i++) { // Mostra 7 giorni (una settimana)
        const slotDate = new Date(date);
        slotDate.setDate(date.getDate() + i);

        const slotElement = document.createElement('div');
        slotElement.classList.add('calendar-slot');
        slotElement.textContent = slotDate.toLocaleDateString();

        // Verifica se la data è già prenotata
        if (appointments.some(appointment => appointment.date === slotDate.toLocaleDateString())) {
            slotElement.classList.add('booked');
            slotElement.textContent += ' (Prenotato)';
        } else {
            slotElement.classList.add('available');
            slotElement.addEventListener('click', () => bookAppointment(slotDate));
        }

        calendarContainer.appendChild(slotElement);
    }
}

// Funzione per prenotare un appuntamento
function bookAppointment(date) {
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;

    if (!name || !email) {
        alert("Per favore, compila tutti i campi!");
        return;
    }

    const appointment = {
        name,
        email,
        date: date.toLocaleDateString()
    };

    appointments.push(appointment);
    alert(`Appuntamento prenotato per ${name} il ${date.toLocaleDateString()}`);
    renderCalendar();
}

// Gestione del form di prenotazione
const form = document.getElementById('appointment-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const date = new Date(document.getElementById('appointment-date').value);
    bookAppointment(date);
});

// Inizializza il calendario
renderCalendar();
