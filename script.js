// URL of your bot API (Cloudflare tunnel)
const API_URL = "https://drawing-temperatures-brothers-reynolds.trycloudflare.com";

// Update status display
async function loadStatus() {
    try {
        const res = await fetch(`${API_URL}/api/status`);
        const data = await res.json();
        document.getElementById("status").textContent = data.status || "unknown";
    } catch (err) {
        console.error("Failed to fetch status:", err);
        document.getElementById("status").textContent = "Error 😢";
    }
}

// Change bot status
async function setStatus(status) {
    try {
        const res = await fetch(`${API_URL}/api/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        const data = await res.json();
        document.getElementById("status").textContent = data.updated || status;
    } catch (err) {
        console.error("Failed to set status:", err);
    }
}

// Trigger chaos mode
async function triggerChaos() {
    try {
        const res = await fetch(`${API_URL}/api/chaos`, { method: "POST" });
        const data = await res.json();
        document.getElementById("chaosResult").textContent = data.triggered || "No event 😢";
    } catch (err) {
        console.error("Failed to trigger chaos:", err);
        document.getElementById("chaosResult").textContent = "Error 😢";
    }
}

// Auto-load status on page load
window.addEventListener("DOMContentLoaded", loadStatus);