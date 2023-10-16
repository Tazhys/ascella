const { EmbedBuilder, Colors, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'ping',
    permissions: [PermissionFlagsBits.SendMessages],
    async execute(ascella, message) {
        const msg = await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${ascella.abstract.em.load} Pinging...`).setColor(Colors.Blue)] });

        const apiLatency = Math.round(ascella.ws.ping);
        const botLatency = msg.createdTimestamp - message.createdTimestamp;

        let color = Colors.Green;
        let description = 'We\'re operating at optimal levels.';

        if (apiLatency > 200) {
            description = `${ascella.abstract.em.warn} API Latency was detected above 200ms.`;
            color = Colors.Yellow;
        }

        if (botLatency > 450) {
            description = `${ascella.abstract.em.warn} Bot Latency was detected above 300ms.`;
            color = Colors.Yellow;
        }

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setDescription(description)
            .setColor(color)
            .addFields({ name: 'API Latency', value: `${apiLatency}ms`, inline: true }, { name: 'Bot Latency', value: `${botLatency}ms`, inline: true })
            .setTimestamp();

        msg.edit({ content: '', embeds: [embed] });
    }
};
