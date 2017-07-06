export class Machine {
    constructor(registers, inputs, outputCount) {
        this.registers = registers;
        this.inputs = inputs;
        this.pc = 0;
        this.working_register = null;
        this.outputCount = outputCount;
    }

    run(commands) {
        let outputs = []
        while (true) {
            let currentCommand = commands[this.pc];
            let output = currentCommand.exec(this);
            if (output != null || output != undefined) {
                outputs.push(output);
            }
            if (outputs.length == this.outputCount) {
                return outputs;
            }
        }
    }
}

export const MnemonicType = {
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
}

function convertToInt(str) {
    return str.charCodeAt(0);
}

export class Command {
    constructor(mnemonic, operand) {
        this.mnemonic = mnemonic;
        this.operand = operand;
    }

    exec(machine) {
        switch (this.mnemonic) {
            case MnemonicType.inbox:
                machine.working_register = machine.inputs.shift();
                machine.pc++;
                return null;
            case MnemonicType.outbox:
                let output = machine.working_register;
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
                    machine.working_register = convertToInt(machine.working_register)  - convertToInt(machine.registers[this.operand]);
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
}
