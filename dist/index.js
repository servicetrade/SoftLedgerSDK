'use strict';
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __exportStar =
	(this && this.__exportStar) ||
	function (m, exports) {
		for (var p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.SoftLedgerAPIv2 = exports.SoftLedgerAPI = void 0;
__exportStar(require('./types'), exports);
var SoftLedgerAPI_1 = require('./SoftLedgerAPI');
Object.defineProperty(exports, 'SoftLedgerAPI', {
	enumerable: true,
	get: function () {
		return SoftLedgerAPI_1.SoftLedgerAPI;
	},
});
var SoftLedgerAPI_2 = require('./v2/SoftLedgerAPI');
Object.defineProperty(exports, 'SoftLedgerAPIv2', {
	enumerable: true,
	get: function () {
		return SoftLedgerAPI_2.SoftLedgerAPI;
	},
});
