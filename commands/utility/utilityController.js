//Vars
const JSDocTypes = require('../../JSDocTypes');
const db = require('../../database');

//Exporting needs
exports.Discord = require('discord.js');
exports.JSDocTypes = JSDocTypes;
exports.db = db;

//Exporting functions
exports.help = require('./help').help;
exports.changePrefix = require('./changePrefix').changePrefix;