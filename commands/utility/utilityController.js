//Vars
const JSDocTypes = require('../../JSDocTypes');
const DiscordMessageType = JSDocTypes.DiscordMessageType;

//Exporting needs
exports.Discord = require('discord.js');
exports.JSDocTypes = JSDocTypes;

//Exporting functions
exports.help = require('./help').help;