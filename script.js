// dashboard/script.js
// Replace API_BASE if your tunnel URL changes
const API_BASE = 'https://drawing-temperatures-brothers-reynolds.trycloudflare.com';

const statusEl = document.getElementById('status');
const chaosEl = document.getElementById('chaosResult');

async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    throw err;
  }
}

async function fetchStatus() {
  statusEl.textContent = 'Loading…';
  try {
    const data = await fetchJSON(`${API_BASE}/api/status`);
    statusEl.textContent = data.status ?? 'unknown';
  } catch (err) {
    console.error('fetchStatus error', err);
    statusEl.textContent = 'Error fetching status';
  }
}

async function setStatus(newStatus) {
  // simple UI feedback
  const old = statusEl.textContent;
  statusEl.textContent = 'Updating…';
  try {
    const data = await fetchJSON(`${API_BASE}/api/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    statusEl.textContent = data.updated ?? newStatus;
  } catch (err) {
    console.error('setStatus error', err);
    statusEl.textContent = old;
    alert('Failed to update status. Check the tunnel & Termux bot.');
  }
}

async function triggerChaos() {
  chaosEl.textContent = 'Triggering…';
  try {
    const data = await fetchJSON(`${API_BASE}/api/chaos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    chaosEl.textContent = data.triggered ?? 'No response';
  } catch (err) {
    console.error('triggerChaos error', err);
    chaosEl.textContent = 'Chaos failed 😢';
    alert('Chaos failed — check that your bot/API is running and reachable.');
  }
}

// wire up buttons if you want inline handlers in HTML removed, uncomment and use:
// document.getElementById('btn-online').onclick = () => setStatus('online');

window.addEventListener('load', () => {
  fetchStatus();

  // refresh status every 12s so UI stays in sync
  setInterval(fetchStatus, 12_000);
});