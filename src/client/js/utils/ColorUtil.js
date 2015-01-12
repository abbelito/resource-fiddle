/**
 * Color utilities.
 * @class ColorUtil
 */
function ColorUtil() {}

/**
 * Parse html color.
 * @method parseHTMLColor
 */
ColorUtil.parseHTMLColor = function(htmlColor) {
	if (htmlColor === undefined || htmlColor === null)
		htmlColor = "";

	var s = htmlColor.toString().trim().replace("#", "");
	var c = {
		red: parseInt(s[0] + s[1], 16),
		green: parseInt(s[2] + s[3], 16),
		blue: parseInt(s[4] + s[5], 16),
	}

	if (isNaN(c.red))
		c.red = 0;

	if (isNaN(c.green))
		c.green = 0;

	if (isNaN(c.blue))
		c.blue = 0;

	return c;
}

/**
 * Convert html to hex.
 * @method htmlToHex
 */
ColorUtil.htmlToHex = function(html) {
	var color = ColorUtil.parseHTMLColor(html);

	return (color.red << 16) + (color.green << 8) + (color.blue);
}

/**
 * Converts a hex color number to a html color.
 * @method hexToHTML
 */
ColorUtil.hexToHTML = function(hex) {
	var red = (hex >> 16 & 0xFF);
	var green = (hex >> 8 & 0xFF);
	var blue = (hex & 0xFF);

	return "#" +
		ColorUtil.prefixZero(red.toString(16), 2) +
		ColorUtil.prefixZero(green.toString(16), 2) +
		ColorUtil.prefixZero(blue.toString(16), 2);
};

/**
 * Prefix zero
 * @method prefixZero
 */
ColorUtil.prefixZero = function(s, n) {
	if (!n)
		n = 2;

	while (s.length < n)
		s = "0" + s;

	return s;
}

module.exports = ColorUtil;