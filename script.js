const API_URL = "https://<YOUR_PUBLIC_API_URL>"; // replace with ngrok or Cloudflare tunnel URL

// Get bot status
async function getStatus() {
    try {
        const res = await fetch(`${API_URL}/api/status`);
        const data = await res.json();
        document.getElementById("status").textContent = data.status;
    } catch (err) {
        document.getElementById("status").textContent = "Error fetching status";
        console.error(err);
    }
}

// Set bot status
async function setStatus(status) {
    try {
        await fetch(`${API_URL}/api/status`, {
            method: "POST",
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
