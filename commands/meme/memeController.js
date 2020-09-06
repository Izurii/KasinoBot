//Vars
const JSDocTypes = require('../../JSDocTypes');
const { PythonShell } = require('python-shell');
const pathToMagikScript = __dirname+'../../../scripts/magik.py';
const utilFunctions = require('../../utilFunctions');

//Exports needs
exports.JSDocTypes = JSDocTypes;
exports.utilFunctions = utilFunctions;
exports.pathToMagikScript = pathToMagikScript;
exports.pythonShell = PythonShell;
exports.fs = require('fs-extra');

//Exports functions
exports.magik = require('./magik').magik;