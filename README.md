# Ascella Discord Bot

## Introduction

Welcome to the Ascella project! This bot is inspired by various other bots and is designed to provide a stable and robust codebase for a wide range of applications. Whether you're a developer looking to build upon this bot or a user looking to take advantage of its functionality, this readme will guide you through the essential information you need to get started.

## Features

Ascella comes with a couple features for you to learn off, and addon to. This list may or may not grow:

- Ping command - dynamically changes the embed color based on ping.
- Webhook manager/util
- Logger - log to console in style

## Getting Started

Before you start using Ascella, you should make sure you have the following prerequisites in place:

1. Node.js 1.16.X >
2. Braincells
3. Big brain
4. Patience.

## Installation

To use Ascella on your own computer, follow these steps:

1. git clone https://github.com/Tazhys/ascella.git
2. cd ascella-main
3. npm install
4. npm run start or npm run dev (nodemon)

## Configuration

To configure the bot for your specific use case, follow these steps:

1. Goto the abstract directory (src/abstract) and make two files. (settings.js & .env)
2. Open settings.js and add the following

```js
module.exports = {
  prefix: "a!",
  em: {
    load: "",
    succ: "",
    erro: "",
    warn: "",
  },

  webhooks: {
    error: "",
    command: "",
  },
};
```

3. Open .env and add the following

```
token="DISCORD_BOT_TOKEN"
```

## Contribution

I welcome contributions to the Ascell project. If you have any ideas for new features, improvements, or bug fixes, please follow these guidelines for contributing:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear and concise messages.
4. Push your branch to your fork.
5. Create a pull request (PR) to the main repository.
