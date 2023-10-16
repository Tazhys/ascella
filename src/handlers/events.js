const { readdir } = require('fs').promises;
const { join } = require('path');

module.exports = class Events {
    constructor(ascella) {
        this.ascella = ascella;
    }

    async load() {
        try {
            const files = await readdir('./src/events/');

            for (const file of files) {
                const eventName = file.split(".")[0];
                const eventModule = require(join(__dirname, '../events', file));
                this.ascella.logger(`${eventName} (${file}) was loaded`, 'info');
                this.ascella.on(eventName, eventModule.bind(null, this.ascella));
            }
        } catch (err) {
            this.ascella.logger(err.stack, 'error');
        }
    }
}