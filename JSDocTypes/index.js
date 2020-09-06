const Discord = require('discord.js');
const mysql = require('mysql');

const DiscordMessageType = new Discord.Message;
const DiscordGuildType = new Discord.Guild;
const DiscordChannelType = Discord.Channel;

exports.DiscordGuildType = DiscordGuildType;
exports.DiscordMessageType = DiscordMessageType;
exports.DiscordChannelType = DiscordChannelType;