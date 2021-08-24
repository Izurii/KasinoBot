require('dotenv').config();

import { KasinoBot } from './client/Client';

const Kasino = new KasinoBot();
Kasino.Start();

process.stdin.resume();

function exitHandler(options: { cleanup?: boolean, exit?: boolean }, exitCode: number) {
	Kasino.destroy();
	let exitMessage = '\nKasinoBot Logout!';
	if (exitCode || exitCode === 0) exitMessage += ` Exit code: ${exitCode}`;
	console.log(exitMessage);
	if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null, { cleanup:true }));

process.on('SIGINT', exitHandler.bind(null, { exit:true }));

process.on('SIGUSR1', exitHandler.bind(null, { exit:true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit:true }));

process.on('uncaughtException', exitHandler.bind(null, { exit:true }));