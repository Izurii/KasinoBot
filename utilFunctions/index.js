/**
 * @description Function that returns a random int given the minimum and maximum passed to the function
 * @param  { Number } min - Minimum value
 * @param  { Number } max - Maximum value
 * @returns { Number } - Returns a random integer number given the min~max parameters
 */
exports.randomInt = async (min, max) => {
	return min + Math.floor((max - min) * Math.random());
}

/**
 * @description Function that return the average of number on a determined array
 * @param  { Array } array - Array that contains the numbers to be averaged off
 * @returns { Number } Return the average number between numbers on a array
 */
exports.average = async (array) => {
	return (array.reduce(function (a, b){ return a+b;}))/array.length;
}

/**
 * @description Function that format a given string to a max of characters passed on the function's parameter, if text exceed the limit he writes tree dots
 * @param  { string } text - Text that is to be formatted
 * @param  { Number } length=1024 - Define de max characters of the function's return
 * @returns { string } - Return the formatted text wihtin the character limit defined by length parameter 
 */
exports.formatTextLimitCharacters = async (text, length=1024) => {
	if (text == null) {
		return text;
	}
	if (text.length <= length) {
		return text;
	}
	text = text.substring(0, length);
	last = text.lastIndexOf(" ");
	text = text.substring(0, last);
	return text + "...";
}