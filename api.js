// api.js
const express = require('express');
const router = express.Router();

// --- In-memory storage for demonstration ---
let botStatus = 'online'; // default bot status
const activityLog = [];

// Helper to add activity
function logActivity(message) {
    const timestamp = new Date().toLocaleTimeString();
    activityLog.unshift(`[${timestamp}] ${message}`);
    if (activityLog.length > 50) activityLog.pop(); // keep only 50 items
}

// --- GET Bot Status ---
router.get('/status', (req, res) => {
    res.json({ status: botStatus });
});

// --- POST Bot Status ---
router.post('/status', (req, res) => {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'No status provided' });

    botStatus = status;
    logActivity(`Bot status changed to ${status}`);
    res.json({ updated: botStatus });
});

// --- POST Chaos Mode ---
router.post('/chaos', (req, res) => {
    const chaosEvents = [
        "✨ Confetti everywhere! ✨",
        "💥 BOOM! Something exploded! 💥",
        "🍕 Pizza rain! 🍕",
        "👻 A ghost appears! 👻",
        "🎉 You feel... magical? 🎉"
    ];
    const randomEvent = chaosEvents[Math.floor(Math.random() * chaosEvents.length)];
    logActivity(`Chaos triggered: ${randomEvent}`);
    res.json({ triggered: randomEvent });
});

// --- POST Command ---
router.post('/command', (req, res) => {
    const { command } = req.body;
    if (!command) return res.status(400).json({ error: 'No command provided' });

    let response = '';
    // Simple command handling
    if (command.toLowerCase() === 'hug') {
        response = 'Here’s a big hug! 🤗💖';
    } else if (command.toLowerCase() === 'surprise') {
        const surpriseEvents = [
            "🎁 You got a surprise gift!",
            "🌈 Rainbow appears!",
            "🪄 Magic spell cast!",
            "🚀 Rocket launched!"
        ];
        response = surpriseEvents[Math.floor(Math.random() * surpriseEvents.length)];
    } else {
        response = `Command "${command}" not recognized.`;
    }

    logActivity(`Command sent: "${command}" => ${response}`);
    res.json({ response });
});

// --- GET Activity Feed ---
router.get('/activity', (req, res) => {
    res.json({ activity: activityLog });
});

module.exports = router;