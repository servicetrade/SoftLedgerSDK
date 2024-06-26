'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StatusType = exports.StatusState = void 0;
var StatusState;
(function (StatusState) {
	StatusState['DONE'] = 'done';
	StatusState['ERROR'] = 'error';
	StatusState['RUNNING'] = 'running';
	StatusState['STARTED'] = 'started';
})((StatusState = exports.StatusState || (exports.StatusState = {})));
var StatusType;
(function (StatusType) {
	StatusType['COSTBASIS'] = 'costbasis';
	StatusType['CRYPTO_JOURNAL'] = 'crypto-journals';
	StatusType['INVENTORY'] = 'inventory';
})((StatusType = exports.StatusType || (exports.StatusType = {})));
