const countdownForm = document.getElementById('countdown-form');
const countdownElement = document.getElementById('countdown');
const historyElement = document.getElementById('history');
const startCountdownButton = document.getElementById('start-countdown');
const stopCountdownButton = document.getElementById('stop-countdown');

let countdowns = [];
let countdownInterval; // Store the interval ID

countdownForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const days = parseInt(document.getElementById('days').value, 10);

    if (!isNaN(days) && eventName.trim() !== '') {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);

        const countdown = {
            eventName,
            targetDate
        };

        countdowns.push(countdown);

        updateHistory();
        startCountdown(targetDate, eventName);

        document.getElementById('event-name').value = '';
        document.getElementById('days').value = '';
    }
});

stopCountdownButton.addEventListener('click', function() {
    clearInterval(countdownInterval); // Stop the countdown
    countdownElement.innerHTML = 'Countdown stopped.';
    startCountdownButton.style.display = 'block';
    stopCountdownButton.style.display = 'none';
});

function updateHistory() {
    historyElement.innerHTML = '';
    countdowns.forEach((countdown, index) => {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => deleteCountdown(index));
        li.innerHTML = `${countdown.eventName} - ${countdown.targetDate.toDateString()}`;
        li.appendChild(deleteButton);
        historyElement.appendChild(li);
    });
}

function deleteCountdown(index) {
    countdowns.splice(index, 1);
    updateHistory();
}

function startCountdown(targetDate, eventName) {
    clearInterval(countdownInterval); // Clear any existing interval

    const updateCountdown = () => {
        const currentDate = new Date().getTime();
        const timeRemaining = targetDate - currentDate;

        if (timeRemaining > 0) {
            const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${eventName} in ${daysRemaining} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
        } else {
            countdownElement.innerHTML = `${eventName} has started.`;
            clearInterval(countdownInterval); // Clear interval when countdown is complete
        }
    };

    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    startCountdownButton.style.display = 'none';
    stopCountdownButton.style.display = 'block';
}
