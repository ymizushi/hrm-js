export class Machine {
    constructor(registers, inputs) {
        this.registers = registers
        this.inputs = inputs;
        this.pc = 0;
        this.working_register = null;
    }

    run(commands) {
        while (true) {
            commands[this.pc].exec(this);
            if (commands.length - 1 < this.pc) {
                console.log("exit");
                return;
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

export class Command {
    constructor(mnemonic, operand) {
        this.mnemonic = mnemonic;
        this.operand = operand;
    }

    exec(machine) {
        switch (this.mnemonic) {
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
            case MnemonicType.pCopyfrom:
                var pointer = machine.registers[this.operand];
                machine.working_register = machine.registers[pointer];
                machine.pc += 1;
                break;
            case MnemonicType.copyto:
                machine.registers[this.operand] = machine.working_register;
                machine.pc += 1;
                break;
            case MnemonicType.pCopyto:
                var pointer = machine.registers[this.operand];
                machine.registers[pointer] = machine.working_register;
                machine.pc += 1;
                break;
            case MnemonicType.add:
                machine.working_register = machine.working_register + machine.registers[this.operand];
                machine.pc += 1;
                break;
            case MnemonicType.pAdd:
                var pointer = machine.registers[this.operand];
                machine.working_register = machine.working_register + machine.registers[pointer];
                machine.pc += 1;
                break;
            case MnemonicType.sub:
                machine.working_register = machine.working_register - machine.registers[this.operand];
                machine.pc += 1;
                break;
            case MnemonicType.pSub:
                var pointer = machine.registers[this.operand];
                machine.working_register = machine.working_register - machine.registers[pointer];
                machine.pc += 1;
                break;
            case MnemonicType.bumpPlus:
                machine.registers[this.operand] += 1;
                machine.pc += 1;
                machine.working_registera = machine.registers[this.operand];
                break;
            case MnemonicType.pBumpPlus:
                var pointer = machine.registers[this.operand];
                machine.registers[pointer] += 1;
                machine.working_register = machine.registers[pointer];
                machine.pc += 1;
                break;
            case MnemonicType.bumpMinus:
                machine.registers[this.operand] -= 1;
                machine.pc += 1;
                break;
            case MnemonicType.pBumpMinus:
                var pointer = machine.registers[this.operand];
                machine.registers[pointer] -= 1;
                machine.working_register = machine.registers[pointer];
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
