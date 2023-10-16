const colors = require('colors');

function logger(message, logLevel = 'info') {
    const log = (message, color) => {
        console.log(color(message));
    };

    const logWithPrefix = (message, prefix, color) => {
        log(`[${prefix}] : ${message}`, color);
    };

    switch (logLevel) {
        case 'info':
            logWithPrefix(message, 'INFO', colors.cyan);
            break;
        case 'warn':
            logWithPrefix(message, 'WARNING', colors.yellow);
            break;
        case 'error':
            logWithPrefix(message, 'ERROR', colors.red);
            break;
        case 'command':
            logWithPrefix(message, 'COMMAND', colors.magenta);
            break;
        case 'gradient':
            logWithGPrefix(message, 'COMMAND', colors.magenta);
            break;
        default:
            logWithPrefix(`Unknown log level: ${logLevel}`, 'UNKNOWN', colors.gray);
            break;
    }
}

module.exports = logger;
