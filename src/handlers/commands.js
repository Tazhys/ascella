const { readdir } = require('fs').promises;
const { join } = require('path');

module.exports = class Commands {
    constructor(ascella) {
        this.ascella = ascella;
    }

    async load() {
        try {
            const commandFolders = await readdir('./src/commands/');

            for (const folder of commandFolders) {
                const folderPath = join(__dirname, '../commands', folder);
                const commandFiles = await readdir(folderPath);

                for (const commandFile of commandFiles) {
                    if (commandFile.endsWith('.js')) {
                        const commandPath = join(folderPath, commandFile);
                        const commandModule = require(commandPath);

                        if (commandModule.name) {
                            // If the command module has a 'name' property, associate it with the module
                            this.ascella.commands.set(commandModule.name, commandModule);
                            this.ascella.logger(`${commandModule.name} (${commandFile}) was loaded`, 'info');
                        } else {
                            this.ascella.logger(`${commandFile} does not have a 'name' property and will not be loaded.`, 'warn');
                        }
                    }
                }
            }
        } catch (err) {
            this.ascella.logger(err.stack, 'error');
        }
    }
}
