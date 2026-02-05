// Common Utility for Timer Updates
function updateTimer(diff, elements, endMessage) {
    if (diff <= 0) {
        clearInterval(elements.interval);
        ["days", "hours", "minutes", "seconds"].forEach((unit) => (elements[unit].textContent = "00"));
        endMessage.textContent = "Countdown Ended!";
        playSound();
        return true;
    }
    elements.days.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
    elements.hours.textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    elements.minutes.textContent = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
    elements.seconds.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
    endMessage.textContent = "";
    return false;
}

// Start Main Countdown
document.getElementById("startBtn").addEventListener("click", () => {
    const datetimeInput = document.getElementById("datetime").value;
    const targetDate = new Date(datetimeInput).getTime();

    if (!datetimeInput || targetDate <= new Date().getTime()) {
        alert("Please select a valid future date!");
        return;
    }

    const elements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
        interval: null,
    };
    const endMessage = document.getElementById("mainEndMessage");
    endMessage.textContent = "";

    elements.interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        updateTimer(diff, elements, endMessage);
    }, 1000);
});

// Add Multi Countdown
document.getElementById("addCountdownBtn").addEventListener("click", () => {
    const datetimeInput = document.getElementById("dateInput").value;
    const targetDate = new Date(datetimeInput).getTime();

    if (!datetimeInput || targetDate <= new Date().getTime()) {
        alert("Please select a valid future date!");
        return;
    }

    const container = document.createElement("div");
    container.className = "countdown-block";
    container.innerHTML = `
        <input class="countdown-label" type="text" placeholder="Enter Label (e.g., Exam)" />
        <div class="countdown">
            ${["Days", "Hours", "Minutes", "Seconds"].map((unit) => `<div><span class="${unit.toLowerCase()}">00</span><br>${unit}</div>`).join("")}
        </div>
        <button class="delete-btn">Delete</button>
        <div class="end-message"></div>
    `;
    document.getElementById("countdownsContainer").appendChild(container);

    const elements = {
        days: container.querySelector(".days"),
        hours: container.querySelector(".hours"),
        minutes: container.querySelector(".minutes"),
        seconds: container.querySelector(".seconds"),
        interval: null,
    };
    const endMessage = container.querySelector(".end-message");

    elements.interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        updateTimer(diff, elements, endMessage);
    }, 1000);

    container.querySelector(".delete-btn").addEventListener("click", () => {
        clearInterval(elements.interval);
        container.remove();
    });
});

// Play Sound
function playSound() {
    const sound = document.getElementById("timerSound");
    sound.currentTime = 0;
    sound.play();
}