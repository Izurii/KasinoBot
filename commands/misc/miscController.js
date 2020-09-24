//Vars
const JSDocTypes = require('../../JSDocTypes');
const axios = require('axios').default;
const utilFunctions = require('../../utilFunctions');

//Exporting needs
exports.Discord = require('discord.js');
exports.JSDocTypes = JSDocTypes;
exports.axios = axios;
exports.utilFunctions = utilFunctions;
exports.DiscordEmbedPagination = require('discord-paginationembed');

//Exporting functions
exports.dolar = require('./dolar').dolar;
exports.euro = require('./euro').euro;
exports.libra = require('./libra').libra;
exports.iene = require('./iene').iene;
exports.number_functions = require('./number_functions').number_functions;
exports.roll_number = require('./roll_number').roll_number;
exports.reverse = require('./reverse').reverse;
exports.anime = require('./anime').anime;
exports.corona = require('./corona').corona;