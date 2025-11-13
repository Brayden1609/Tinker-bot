const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = ''; // replace with your actual token

client.once(Events.ClientReady, () => {
    console.log(`Logged in as Tinker.dev! 💖`);
    client.user.setActivity("Tinkering 🤪", { type: "PLAYING" });
    client.user.setStatus("dnd");
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'hug') {
        await interaction.reply(`Here’s a big hug for ${interaction.user}! 🤗💖`);
    allowedMentions: { users: [interaction.user.id] } // ensures only the person gets pinged
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

client.login(TOKEN);
