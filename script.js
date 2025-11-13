const statusEl = document.getElementById('status');
const chaosResultEl = document.getElementById('chaosResult');
const commandInput = document.getElementById('commandInput');
const commandResultEl = document.getElementById('commandResult');
const activityFeed = document.getElementById('activityFeed');

const API_BASE = 'https://tinker-bot-rose.vercel.app/';

// ---- BOT STATUS ----
async function getStatus() {
    try {
        const res = await fetch(`${API_BASE}/api/status`);
        const data = await res.json();
        statusEl.textContent = data.status || 'Unknown';
    } catch (err) {
        statusEl.textContent = 'Error fetching status';
        console.error(err);
    }
}

async function setStatus(status) {
    try {
        const res = await fetch(`${API_BASE}/api/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        const data = await res.json();
        statusEl.textContent = data.updated;
        addActivity(`Bot status changed to ${data.updated}`);
    } catch (err) {
        console.error(err);
    }
}

// ---- CHAOS MODE ----
async function triggerChaos() {
    try {
        const res = await fetch(`${API_BASE}/api/chaos`, { method: 'POST' });
        const data = await res.json();
        chaosResultEl.textContent = data.triggered;
        addActivity(`Chaos triggered: ${data.triggered}`);
    } catch (err) {
        chaosResultEl.textContent = 'Error triggering chaos';
        console.error(err);
    }
}

// ---- SEND COMMAND ----
async function sendCommand() {
    const commandText = commandInput.value.trim();
    if (!commandText) return;

    try {
        const res = await fetch(`${API_BASE}/api/command`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: commandText })
        });
        const data = await res.json();
        commandResultEl.textContent = data.response;
        addActivity(`Command sent: "${commandText}" => ${data.response}`);
        commandInput.value = '';
    } catch (err) {
        commandResultEl.textContent = 'Error sending command';
        console.error(err);
    }
}

// ---- ACTIVITY FEED ----
function addActivity(message) {
    const li = document.createElement('li');
    li.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    activityFeed.prepend(li);
}

// ---- INITIAL LOAD ----
getStatus();