"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ms";
exports.ids = ["vendor-chunks/ms"];
exports.modules = {

/***/ "(rsc)/../../node_modules/ms/index.js":
/*!**************************************!*\
  !*** ../../node_modules/ms/index.js ***!
  \**************************************/
/***/ ((module) => {

eval("/**\n * Helpers.\n */ \nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */ module.exports = function(val, options) {\n    options = options || {};\n    var type = typeof val;\n    if (type === \"string\" && val.length > 0) {\n        return parse(val);\n    } else if (type === \"number\" && isFinite(val)) {\n        return options.long ? fmtLong(val) : fmtShort(val);\n    }\n    throw new Error(\"val is not a non-empty string or a valid number. val=\" + JSON.stringify(val));\n};\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */ function parse(str) {\n    str = String(str);\n    if (str.length > 100) {\n        return;\n    }\n    var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);\n    if (!match) {\n        return;\n    }\n    var n = parseFloat(match[1]);\n    var type = (match[2] || \"ms\").toLowerCase();\n    switch(type){\n        case \"years\":\n        case \"year\":\n        case \"yrs\":\n        case \"yr\":\n        case \"y\":\n            return n * y;\n        case \"weeks\":\n        case \"week\":\n        case \"w\":\n            return n * w;\n        case \"days\":\n        case \"day\":\n        case \"d\":\n            return n * d;\n        case \"hours\":\n        case \"hour\":\n        case \"hrs\":\n        case \"hr\":\n        case \"h\":\n            return n * h;\n        case \"minutes\":\n        case \"minute\":\n        case \"mins\":\n        case \"min\":\n        case \"m\":\n            return n * m;\n        case \"seconds\":\n        case \"second\":\n        case \"secs\":\n        case \"sec\":\n        case \"s\":\n            return n * s;\n        case \"milliseconds\":\n        case \"millisecond\":\n        case \"msecs\":\n        case \"msec\":\n        case \"ms\":\n            return n;\n        default:\n            return undefined;\n    }\n}\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtShort(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return Math.round(ms / d) + \"d\";\n    }\n    if (msAbs >= h) {\n        return Math.round(ms / h) + \"h\";\n    }\n    if (msAbs >= m) {\n        return Math.round(ms / m) + \"m\";\n    }\n    if (msAbs >= s) {\n        return Math.round(ms / s) + \"s\";\n    }\n    return ms + \"ms\";\n}\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtLong(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return plural(ms, msAbs, d, \"day\");\n    }\n    if (msAbs >= h) {\n        return plural(ms, msAbs, h, \"hour\");\n    }\n    if (msAbs >= m) {\n        return plural(ms, msAbs, m, \"minute\");\n    }\n    if (msAbs >= s) {\n        return plural(ms, msAbs, s, \"second\");\n    }\n    return ms + \" ms\";\n}\n/**\n * Pluralization helper.\n */ function plural(ms, msAbs, n, name) {\n    var isPlural = msAbs >= n * 1.5;\n    return Math.round(ms / n) + \" \" + name + (isPlural ? \"s\" : \"\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBOztDQUVDO0FBRUQsSUFBSUEsSUFBSTtBQUNSLElBQUlDLElBQUlELElBQUk7QUFDWixJQUFJRSxJQUFJRCxJQUFJO0FBQ1osSUFBSUUsSUFBSUQsSUFBSTtBQUNaLElBQUlFLElBQUlELElBQUk7QUFDWixJQUFJRSxJQUFJRixJQUFJO0FBRVo7Ozs7Ozs7Ozs7OztDQVlDLEdBRURHLE9BQU9DLE9BQU8sR0FBRyxTQUFVQyxHQUFHLEVBQUVDLE9BQU87SUFDckNBLFVBQVVBLFdBQVcsQ0FBQztJQUN0QixJQUFJQyxPQUFPLE9BQU9GO0lBQ2xCLElBQUlFLFNBQVMsWUFBWUYsSUFBSUcsTUFBTSxHQUFHLEdBQUc7UUFDdkMsT0FBT0MsTUFBTUo7SUFDZixPQUFPLElBQUlFLFNBQVMsWUFBWUcsU0FBU0wsTUFBTTtRQUM3QyxPQUFPQyxRQUFRSyxJQUFJLEdBQUdDLFFBQVFQLE9BQU9RLFNBQVNSO0lBQ2hEO0lBQ0EsTUFBTSxJQUFJUyxNQUNSLDBEQUNFQyxLQUFLQyxTQUFTLENBQUNYO0FBRXJCO0FBRUE7Ozs7OztDQU1DLEdBRUQsU0FBU0ksTUFBTVEsR0FBRztJQUNoQkEsTUFBTUMsT0FBT0Q7SUFDYixJQUFJQSxJQUFJVCxNQUFNLEdBQUcsS0FBSztRQUNwQjtJQUNGO0lBQ0EsSUFBSVcsUUFBUSxtSUFBbUlDLElBQUksQ0FDakpIO0lBRUYsSUFBSSxDQUFDRSxPQUFPO1FBQ1Y7SUFDRjtJQUNBLElBQUlFLElBQUlDLFdBQVdILEtBQUssQ0FBQyxFQUFFO0lBQzNCLElBQUlaLE9BQU8sQ0FBQ1ksS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFHLEVBQUdJLFdBQVc7SUFDekMsT0FBUWhCO1FBQ04sS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7WUFDSCxPQUFPYyxJQUFJbkI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7WUFDSCxPQUFPbUIsSUFBSXBCO1FBQ2IsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT29CLElBQUlyQjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3FCLElBQUl0QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3NCLElBQUl2QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3VCLElBQUl4QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3dCO1FBQ1Q7WUFDRSxPQUFPRztJQUNYO0FBQ0Y7QUFFQTs7Ozs7O0NBTUMsR0FFRCxTQUFTWCxTQUFTWSxFQUFFO0lBQ2xCLElBQUlDLFFBQVFDLEtBQUtDLEdBQUcsQ0FBQ0g7SUFDckIsSUFBSUMsU0FBUzFCLEdBQUc7UUFDZCxPQUFPMkIsS0FBS0UsS0FBSyxDQUFDSixLQUFLekIsS0FBSztJQUM5QjtJQUNBLElBQUkwQixTQUFTM0IsR0FBRztRQUNkLE9BQU80QixLQUFLRSxLQUFLLENBQUNKLEtBQUsxQixLQUFLO0lBQzlCO0lBQ0EsSUFBSTJCLFNBQVM1QixHQUFHO1FBQ2QsT0FBTzZCLEtBQUtFLEtBQUssQ0FBQ0osS0FBSzNCLEtBQUs7SUFDOUI7SUFDQSxJQUFJNEIsU0FBUzdCLEdBQUc7UUFDZCxPQUFPOEIsS0FBS0UsS0FBSyxDQUFDSixLQUFLNUIsS0FBSztJQUM5QjtJQUNBLE9BQU80QixLQUFLO0FBQ2Q7QUFFQTs7Ozs7O0NBTUMsR0FFRCxTQUFTYixRQUFRYSxFQUFFO0lBQ2pCLElBQUlDLFFBQVFDLEtBQUtDLEdBQUcsQ0FBQ0g7SUFDckIsSUFBSUMsU0FBUzFCLEdBQUc7UUFDZCxPQUFPOEIsT0FBT0wsSUFBSUMsT0FBTzFCLEdBQUc7SUFDOUI7SUFDQSxJQUFJMEIsU0FBUzNCLEdBQUc7UUFDZCxPQUFPK0IsT0FBT0wsSUFBSUMsT0FBTzNCLEdBQUc7SUFDOUI7SUFDQSxJQUFJMkIsU0FBUzVCLEdBQUc7UUFDZCxPQUFPZ0MsT0FBT0wsSUFBSUMsT0FBTzVCLEdBQUc7SUFDOUI7SUFDQSxJQUFJNEIsU0FBUzdCLEdBQUc7UUFDZCxPQUFPaUMsT0FBT0wsSUFBSUMsT0FBTzdCLEdBQUc7SUFDOUI7SUFDQSxPQUFPNEIsS0FBSztBQUNkO0FBRUE7O0NBRUMsR0FFRCxTQUFTSyxPQUFPTCxFQUFFLEVBQUVDLEtBQUssRUFBRUwsQ0FBQyxFQUFFVSxJQUFJO0lBQ2hDLElBQUlDLFdBQVdOLFNBQVNMLElBQUk7SUFDNUIsT0FBT00sS0FBS0UsS0FBSyxDQUFDSixLQUFLSixLQUFLLE1BQU1VLE9BQVFDLENBQUFBLFdBQVcsTUFBTSxFQUFDO0FBQzlEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVjaGZlc3QvLi4vLi4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzP2I0MjUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB3ID0gZCAqIDc7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigtPyg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8d2Vla3M/fHd8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICBjYXNlICd3ZWVrJzpcbiAgICBjYXNlICd3JzpcbiAgICAgIHJldHVybiBuICogdztcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgZCwgJ2RheScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGgsICdob3VyJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgbSwgJ21pbnV0ZScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIHMsICdzZWNvbmQnKTtcbiAgfVxuICByZXR1cm4gbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG1zQWJzLCBuLCBuYW1lKSB7XG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbikgKyAnICcgKyBuYW1lICsgKGlzUGx1cmFsID8gJ3MnIDogJycpO1xufVxuIl0sIm5hbWVzIjpbInMiLCJtIiwiaCIsImQiLCJ3IiwieSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ2YWwiLCJvcHRpb25zIiwidHlwZSIsImxlbmd0aCIsInBhcnNlIiwiaXNGaW5pdGUiLCJsb25nIiwiZm10TG9uZyIsImZtdFNob3J0IiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5Iiwic3RyIiwiU3RyaW5nIiwibWF0Y2giLCJleGVjIiwibiIsInBhcnNlRmxvYXQiLCJ0b0xvd2VyQ2FzZSIsInVuZGVmaW5lZCIsIm1zIiwibXNBYnMiLCJNYXRoIiwiYWJzIiwicm91bmQiLCJwbHVyYWwiLCJuYW1lIiwiaXNQbHVyYWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/ms/index.js\n");

/***/ })

};
;