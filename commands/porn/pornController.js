//Vars
const JSDocTypes = require('../../JSDocTypes');
const axios = require('axios').default;
const utilFunctions = require('../../utilFunctions');
const { PythonShell } = require('python-shell');
const nHentai = require('nhentai-js');
const pathToIdolScript = __dirname+'../../../scripts/idol.py';
const pathToChanScript = __dirname+'../../../scripts/chan.py';

//Exports needs
exports.Discord = require('discord.js');
exports.pythonShell = PythonShell;
exports.utilFunctions = utilFunctions;
exports.JSDocTypes = JSDocTypes;
exports.axios = axios;
exports.nHentai = nHentai;
exports.pathToIdolScript = pathToIdolScript;
exports.pathToChanScript = pathToChanScript;
exports.formatTagsForBooru = formatTagsForBooru;
exports.fs = require('fs-extra');

//Exports functions
exports.rule34 = require('./rule34').rule34;
exports.idol = require('./idol').idol;
exports.chan = require('./chan').chan;
exports.nhentai = require('./nhentai').nhentai;

/**
 * @description Function that formats string to a specific tag format that boorus accept.
 * @param  { string } text
 * @returns Returns the formatted string 
 */
async function formatTagsForBooru(text) {
	let tags = text;
	tags = tags.substr(tags.indexOf(' ')+1).replace(' ', '+');
	
	if(tags.startsWith('-'))
		tags = "";

	return tags;
}