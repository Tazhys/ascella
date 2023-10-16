class WebhookClient {
    constructor(ascella, name, conf) {
        this.ascella = ascella;
        if (!conf) {
            this.send = () => {
                ascella.logger(`Abstract is missing property 'webhooks.${name}'`, 'error');
            };
        } else {
            this.webhook = new this.ascella.package.Discord.WebhookClient({ url: conf });
        }
    }

    async send(content, options) {
        if (!content) {
            this.ascella.logger('WebhookClient() > content not defined.', 'error');
            return;
        }

        if (content instanceof this.ascella.package.Discord.EmbedBuilder) {
            options = { embeds: [content] };
            content = undefined;
        }

        const newOpt = {
            content: typeof content === 'string' ? content : undefined,
            embeds: content instanceof this.ascella.package.Discord.EmbedBuilder ? [content] : [],
            allowedMentions: { repliedUser: false, parse: [] },
            ...options,
        };

        if (this.webhook) {
            return this.webhook.send(newOpt);
        } else {
            this.ascella.logger('WebhookClient() > Webhook is not defined.', 'error');
        }
    }
}

module.exports = class AscellaHooks {
    constructor(ascella) {
        this.ascella = ascella;

        if (!this.ascella.abstract.webhooks) {
            return this.ascella.logger('Abstract is missing \'webhooks\' property.');
        } else {
            this.error = new WebhookClient(this.ascella, 'error', this.ascella.abstract.webhooks.error);
            this.command = new WebhookClient(this.ascella, 'command', this.ascella.abstract.webhooks.command);
        }
        this.ascella.logger('webhookHandle (webhooks.js) was loaded.', 'info');
    }
}
