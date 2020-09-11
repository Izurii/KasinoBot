//Vars
const JSDocTypes = require('../../JSDocTypes');

//Exporting needs
exports.Discord = require('discord.js');
exports.JSDocTypes = JSDocTypes;

//Exporting functions
exports.help = require('./help').help;
exports.changeprefix = require('./changePrefix');