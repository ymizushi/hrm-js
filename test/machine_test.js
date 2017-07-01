import assert from 'assert';
import {Machine, Command, MnemonicType} from '../src/machine'

describe('Machine', function () {
    describe('#init()', () => {
        it('run machine', () => {
            let commands = [
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.pAdd, 0),
                new Command(MnemonicType.pAdd, 1),
                new Command(MnemonicType.pAdd, 2),
                new Command(MnemonicType.pAdd, 3),
                new Command(MnemonicType.outbox, null),
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.outbox, null),
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.outbox, null),
            ];
            let registers = [0, 1, 2, 3];
            let inputs = [1, 2, 3];

            let machine = new Machine(registers, inputs);
            machine.run(commands);
            assert.equal(10, machine.pc);
        });
    });
});

