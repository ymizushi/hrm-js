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
/***/ (function(module, exports) {

// import _ from 'lodash';

class Machine {
  constructor(registers, inputs) {
    this.registers = registers
    this.inputs = inputs;
    this.pc = 0;
    this.working_register = null;
  }

  run(commands) {
    while(true) {
      commands[this.pc].exec(this);
      if (commands.length-1 < this.pc) {
        console.log("exit");
        return;
      }
    }
  }
}

const MnemonicType = {
  inbox: Symbol(),
  outbox: Symbol(),
  copyfrom: Symbol(),
  copyto: Symbol(),
  add: Symbol(),
  sub: Symbol(),
  bumpPlus: Symbol(),
  bumpMinus: Symbol(),
  jump: Symbol(),
  jumpIfZero: Symbol(),
  jumpIfNeg: Symbol()
}

class Command {
  constructor(mnemonic, operand) {
    this.mnemonic = mnemonic;
    this.operand = operand;
  }

  exec(machine) {
    switch(this.mnemonic) {
    case MnemonicType.inbox:
      machine.working_register = machine.inputs.shift();
      machine.pc += 1;
      break;
    case MnemonicType.outbox:
      console.log(machine.working_register);
      machine.working_register = null;
      machine.pc += 1;
      break;
    case MnemonicType.copyfrom:
      machine.working_register = machine.registers[this.operand];
      machine.pc += 1;
      break;
    case MnemonicType.copyto:
      machine.registers[this.operand] = machine.working_register;
      machine.pc += 1;
      break;
    case MnemonicType.add:
      machine.working_register = machine.working_register + machine.registers[this.operand];
      machine.pc += 1;
      break;
    case MnemonicType.sub:
      machine.working_register = machine.working_register - machine.registers[this.operand];
      machine.pc += 1;
      break;
    case MnemonicType.bumpPlus:
      machine.registers[this.operand] += 1;
      machine.pc += 1;
      break;
    case MnemonicType.bumpMinus:
      machine.registers[this.operand] -= 1;
      machine.pc += 1;
      break;
    case MnemonicType.jump:
      machine.pc = this.operand;
      break;
    case MnemonicType.jumpIfZero:
      if (machine.working_register == 0) {
        machine.pc = this.operand;
      } else {
        machine.pc += 1;
      }
      break;
    case MnemonicType.jumpIfNeg:
      if (machine.working_register < 0) {
        machine.pc = this.operand;
      } else {
        machine.pc += 1;
      }
      break;
    }
  }
}

let commands = [
  new Command(MnemonicType.inbox, null),
  new Command(MnemonicType.copyto, 0),
  new Command(MnemonicType.add, 0),
  new Command(MnemonicType.add, 0),
  new Command(MnemonicType.add, 0),
  new Command(MnemonicType.add, 0),
  new Command(MnemonicType.outbox, null)
];

let registers = [null, null, null, null];
let inputs = [2, 3, 5];

let machine = new Machine(registers, inputs);
machine.run(commands);


/***/ })
/******/ ]);