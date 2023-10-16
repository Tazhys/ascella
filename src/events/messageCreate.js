const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = async (ascella, message) => {
    if (!message || !message.channel) {
        return;
    }

    if (!message.content.startsWith(ascella.abstract.prefix) || message.author.bot) return;

    const args = message.content.slice(ascella.abstract.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const ascellaCommand = ascella.commands.get(commandName);

    if (!ascellaCommand) {
        ascella.logger(`${message.author.tag} (${message.author.id}) tried executing ${commandName} which is invalid.`);
        return ascella.emstyle(`The ${commandName} does not exist.`, 'error', message, ascella);
    }

    const commandAccessLevel = message.channel.permissionsFor(message.author);

    if (!commandAccessLevel) {
        // If permissionsFor returned null
        ascella.logger("User Permissions: Unable to retrieve permissions", 'error');
        return ascella.emstyle(`Unable to retrieve user permissions.`, 'error', message, ascella);
    }

    if (!ascellaCommand.permissions.every(permission => commandAccessLevel.has(permission))) {
        return ascella.emstyle(`You don't have the necessary permissions, access denied.`, 'error', message, ascella);
    }

    try {
        ascellaCommand.execute(ascella, message, args);
        ascella.logger(`(${message.guild.name}) ${message.author.tag} (${message.author.id}) executed ${commandName}.`);
    } catch (err) {
        ascella.logger(err.stack, 'error');
        ascella.emstyle('See console for more details.', 'error', message, ascella);
    }
};
