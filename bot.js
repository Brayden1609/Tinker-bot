// ==== IMPORTS ====
const { Client, GatewayIntentBits, Events } = require('discord.js');
const express = require('express');
const path = require('path');

// ==== DISCORD CLIENT ====
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// ==== EXPRESS DASHBOARD SETUP ====
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dashboard'))); // dashboard folder serves frontend

// ---- API ENDPOINTS ----

// Get bot status
app.get('/api/status', (req, res) => {
    res.send({ status: client.presence?.status || 'dnd' });
});

// Set bot status
app.post('/api/status', (req, res) => {
    const { status } = req.body;
    client.user.setStatus(status);
    res.send({ updated: status });
});

// Trigger chaos event
app.post('/api/chaos', async (req, res) => {
    const events = [
        "✨ Confetti everywhere! ✨",
        "💥 BOOM! Something exploded! 💥",
        "🍕 Pizza rain! 🍕",
        "👻 A ghost appears! 👻",
        "🎉 You feel... magical? 🎉"
    ];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const channel = client.channels.cache.first();
    if (channel) await channel.send(randomEvent);
    res.send({ triggered: randomEvent });
});

// Start Express server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dashboard API running on port ${PORT}`);
});

// ==== DISCORD BOT SETUP ====
require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = process.env.TOKEN;

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}! 💖`);
    client.user.setActivity("Tinkering 🤪", { type: "PLAYING" });
    client.user.setStatus("dnd");
});

// Simple fun slash commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'hug') {
        await interaction.reply(`Here’s a big hug for you! 🤗💖`);
    }

    if (interaction.commandName === 'surprise') {
        const events = [
            "✨ Confetti everywhere! ✨",
            "💥 BOOM! Something exploded! 💥",
            "🍕 Pizza rain! 🍕",
            "👻 A ghost appears! 👻",
            "🎉 You feel... magical? 🎉"
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        await interaction.reply(randomEvent);
    }
});

// Log in the bot
client.login(TOKEN);
