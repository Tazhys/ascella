const { ActivityType } = require('discord.js');

module.exports = async (ascella) => {
    ascella.user.setPresence({
        activities: [
            {
                name: 'with code.',
                type: ActivityType.Playing
            }
        ],
        status: 'online',
    });
}