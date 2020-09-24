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
exports.donate = require('./donate').donate;
exports.adm_message = require('./adm_message').adm_message;