/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Machine = exports.Machine = function () {
    function Machine(registers, inputs, outputCount) {
        _classCallCheck(this, Machine);

        this.registers = registers;
        this.inputs = inputs;
        this.pc = 0;
        this.working_register = null;
        this.outputCount = outputCount;
    }

    _createClass(Machine, [{
        key: "run",
        value: function run(commands) {
            var outputs = [];
            while (true) {
                var currentCommand = commands[this.pc];
                var output = currentCommand.exec(this);
                if (output != null || output != undefined) {
                    outputs.push(output);
                }
                if (outputs.length == this.outputCount) {
                    return outputs;
                }
            }
        }
    }]);

    return Machine;
}();

var MnemonicType = exports.MnemonicType = {
    inbox: Symbol(),
    outbox: Symbol(),
    copyfrom: Symbol(),
    pCopyfrom: Symbol(),
    copyto: Symbol(),
    pCopyto: Symbol(),
    add: Symbol(),
    pAdd: Symbol(),
    sub: Symbol(),
    pSub: Symbol(),
    bumpPlus: Symbol(),
    pBumpPlus: Symbol(),
    bumpMinus: Symbol(),
    pBumpMinus: Symbol(),
    jump: Symbol(),
    jumpIfZero: Symbol(),
    jumpIfNeg: Symbol()
};

function convertToInt(str) {
    return str.charCodeAt(0);
}

var Command = exports.Command = function () {
    function Command(mnemonic, operand) {
        _classCallCheck(this, Command);

        this.mnemonic = mnemonic;
        this.operand = operand;
    }

    _createClass(Command, [{
        key: "exec",
        value: function exec(machine) {
            switch (this.mnemonic) {
                case MnemonicType.inbox:
                    machine.working_register = machine.inputs.shift();
                    machine.pc++;
                    return null;
                case MnemonicType.outbox:
                    var output = machine.working_register;
                    machine.working_register = null;
                    machine.pc++;
                    return output;
                case MnemonicType.copyfrom:
                    machine.working_register = machine.registers[this.operand];
                    machine.pc += 1;
                    return null;
                case MnemonicType.pCopyfrom:
                    var pointer = machine.registers[this.operand];
                    machine.working_register = machine.registers[pointer];
                    machine.pc += 1;
                    return null;
                case MnemonicType.copyto:
                    machine.registers[this.operand] = machine.working_register;
                    machine.pc += 1;
                    return null;
                case MnemonicType.pCopyto:
                    var pointer = machine.registers[this.operand];
                    machine.registers[pointer] = machine.working_register;
                    machine.pc += 1;
                    return null;
                case MnemonicType.add:
                    machine.working_register = machine.working_register + machine.registers[this.operand];
                    machine.pc += 1;
                    return null;
                case MnemonicType.pAdd:
                    var pointer = machine.registers[this.operand];
                    machine.working_register = machine.working_register + machine.registers[pointer];
                    machine.pc += 1;
                    return null;
                case MnemonicType.sub:
                    if (typeof machine.working_register == 'string') {
                        machine.working_register = convertToInt(machine.working_register) - convertToInt(machine.registers[this.operand]);
                    } else {
                        machine.working_register = machine.working_register - machine.registers[this.operand];
                    }
                    machine.pc += 1;
                    return null;
                case MnemonicType.pSub:
                    var pointer = machine.registers[this.operand];
                    machine.working_register = machine.working_register - machine.registers[pointer];
                    machine.pc += 1;
                    return null;
                case MnemonicType.bumpPlus:
                    machine.registers[this.operand] += 1;
                    machine.pc += 1;
                    machine.working_register = machine.registers[this.operand];
                    return null;
                case MnemonicType.pBumpPlus:
                    var pointer = machine.registers[this.operand];
                    machine.registers[pointer] += 1;
                    machine.working_register = machine.registers[pointer];
                    machine.pc += 1;
                    return null;
                case MnemonicType.bumpMinus:
                    machine.registers[this.operand] -= 1;
                    machine.pc += 1;
                    return null;
                case MnemonicType.pBumpMinus:
                    var pointer = machine.registers[this.operand];
                    machine.registers[pointer] -= 1;
                    machine.working_register = machine.registers[pointer];
                    machine.pc += 1;
                    return null;
                case MnemonicType.jump:
                    machine.pc = this.operand;
                    return null;
                case MnemonicType.jumpIfZero:
                    if (machine.working_register == 0) {
                        machine.pc = this.operand;
                    } else {
                        machine.pc += 1;
                    }
                    return null;
                case MnemonicType.jumpIfNeg:
                    if (machine.working_register < 0) {
                        machine.pc = this.operand;
                    } else {
                        machine.pc += 1;
                    }
                    return null;
            }
            throw "UnknownMnemonic";
        }
    }]);

    return Command;
}();

/***/ })
/******/ ]);