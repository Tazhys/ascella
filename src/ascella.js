const { Client, GatewayIntentBits, Options, Collection } = require('discord.js');
require("dotenv").config({ path: "./src/abstract/.env" });

module.exports = class AscellaClient extends Client {
    constructor(ascellaCacheOptions = {}) {
        super({
            intents: [
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.Guilds
            ],
            makeCache: Options.cacheWithLimits({
                MessageManager: 0,
                PresenceManager: 0,
                ...ascellaCacheOptions,
            }),
        });
        this.commands = new Collection();

        /*[Miscellaneous]*/
        this.abstract = require('./abstract/settings');
        this.logger = require('./utilities/logger');
        this.emstyle = require('./utilities/emstyle');

        this.package = {
            Discord: require('discord.js'),
        }

        /*[Handlers]*/
        this.eventHandler = new (require('./handlers/events'))(this).load();
        this.commandHandler = new (require('./handlers/commands'))(this).load();
        this.webhooks = new (require('./handlers/webhooks'))(this);



    }
    attemptLogin() {
        return this.login(process.env.token);
    }
}