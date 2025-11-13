const API_URL = "https://<YOUR_PUBLIC_API_URL>"; // replace with ngrok or Cloudflare tunnel URL

// script.js

// Fetch current bot status on load
async function fetchStatus() {
    try {
        const res = await fetch('/api/status');
        const data = await res.json();
        document.getElementById('status').innerText = data.status;
    } catch (err) {
        console.error(err);
        document.getElementById('status').innerText = 'Error fetching status';
    }
}

// Set bot status
async function setStatus(newStatus) {
    try {
        const res = await fetch('/api/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();
        document.getElementById('status').innerText = data.updated;
    } catch (err) {
        console.error(err);
        alert('Failed to update status!');
    }
}

// Trigger chaos event
async function triggerChaos() {
    try {
        const res = await fetch('/api/chaos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        document.getElementById('chaosResult').innerText = data.triggered;
    } catch (err) {
        console.error(err);
        document.getElementById('chaosResult').innerText = 'Chaos failed 😢';
    }
}

// Initialize
fetchStatus();       method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        getStatus();
    } catch (err) {
        console.error(err);
    }
}

// Trigger chaos
async function triggerChaos() {
    try {
        const res = await fetch(`${API_URL}/api/chaos`, { method: "POST" });
        const data = await res.json();
        document.getElementById("chaosResult").textContent = data.triggered;
    } catch (err) {
        document.getElementById("chaosResult").textContent = "Error triggering chaos";
        console.error(err);
    }
}

// Load status on page load
getStatus();
