// deploy-commands.js
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    { name: 'hug', description: 'Send a big hug!' },
    { name: 'surprise', description: 'Trigger a fun event!' },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

<<<<<<< HEAD
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
=======
(async () => {
    try {
        console.log('Started refreshing global commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), // <-- global!
            { body: commands }
        );
        console.log('Successfully reloaded global commands.');
    } catch (error) {
        console.error(error);
    }
})();
>>>>>>> 0f93f42 (Update Deploy-commqnds.js)
