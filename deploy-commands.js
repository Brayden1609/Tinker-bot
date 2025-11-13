// deploy-commands.js
const { REST, Routes, Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();

// ==== DISCORD CLIENT ====
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = process.env.TOKEN;

// ==== GLOBAL COMMANDS ====
const commands = [
    { name: 'hug', description: 'Send a big hug!' },
    { name: 'surprise', description: 'Trigger a fun event!' },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

// ==== REGISTER GLOBAL COMMANDS ====
(async () => {
    try {
        console.log('Started refreshing global commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), // global commands
            { body: commands }
        );
        console.log('Successfully reloaded global commands.');
    } catch (error) {
        console.error(error);
    }
})();

// ==== BOT READY ====
client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}! 💖`);
    client.user.setActivity("Tinkering 🤪", { type: "PLAYING" });
    client.user.setStatus("dnd");
});

// ==== INTERACTIONS ====
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'hug') {
        await interaction.reply({
            content: `Here’s a big hug for <@${interaction.user.id}>! 🤗💖`,
            allowedMentions: { users: [interaction.user.id] }
        });
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

// ==== LOGIN ====
client.login(TOKEN);
