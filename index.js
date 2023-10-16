const AscellaClient = require('./src/ascella');
const ascella = new AscellaClient();

ascella.attemptLogin().then(() => {
    ascella.logger('Ascella was initalized successfully, thus now ready.');

    process.on("uncaughtException", (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
        console.error("Uncaught Exception: ", errorMsg);
        ascella.webhooks.error.send({ content: `**${ascella?.user?.username || "???"} - uncaughtException:**\n\`\`\`\n${err.stack}`.slice(0, 1995) + '\`\`\`', allowedMentions: { parse: [] } })
        // process.exit(1);
    });

    process.on("unhandledRejection", err => {
        console.error("Uncaught Promise Error: ", err);
        ascella.webhooks.error.send({ content: `**${ascella?.user?.username || "???"} - unhandledRejection:**\n\`\`\`\n${err.stack}`.slice(0, 1995) + '\`\`\`', allowedMentions: { parse: [] } })
    });
});