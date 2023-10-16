const { EmbedBuilder, Colors } = require('discord.js');

function emstyle(content, opt, message, ascella) {
    let description = content;
    let color = Colors.Green;

    switch (opt) {
        case 'error':
            description = `${ascella.abstract.em.erro} An unexpected error has occurred.\n\n> ${content}`;
            color = Colors.Red;
            break;
        case 'success':
            description = `${ascella.abstract.em.succ} ${content}`;
            break;
        case 'warn':
            description = `${ascella.abstract.em.warn} ${content}`;
            color = Colors.Yellow
            break;
    }

    const embed = new EmbedBuilder()
        .setDescription(description)
        .setColor(color);

    message.channel.send({ embeds: [embed] });
}

module.exports = emstyle;