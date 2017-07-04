import assert from 'assert';
import {Machine, Command, MnemonicType} from '../src/machine'

describe('Machine', function () {
    describe('#run()', () => {
        it('input and output', () => {
            let commands = [
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.outbox, null),
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.outbox, null),
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.outbox, null),
            ];
            let registers = [];
            let inputs = [4, 8, 9];
            let outputCount = 3;

            let machine = new Machine(registers, inputs, outputCount);
            let outputs = machine.run(commands);
            assert.equal(4, outputs[0]);
            assert.equal(8, outputs[1]);
            assert.equal(9, outputs[2]);
        });


        it('div', () => {
            let commands = [
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.copyto, 0),
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.copyto, 1),
                new Command(MnemonicType.sub, 0),
                new Command(MnemonicType.outbox, null),
                new Command(MnemonicType.copyfrom, 0),
                new Command(MnemonicType.sub, 1),
                new Command(MnemonicType.outbox, null),
                new Command(MnemonicType.jump, 0),
            ];
            let registers = [null, null, null];
            let inputs = [1, 8, 4, 2, -8, -8, 6, -2];
            let outputCount = 8;

            let machine = new Machine(registers, inputs, outputCount);
            let outputs = machine.run(commands);
            assert.equal(7, outputs[0]);
            assert.equal(-7, outputs[1]);
            assert.equal(-2, outputs[2]);
            assert.equal(2, outputs[3]);
            assert.equal(0, outputs[4]);
            assert.equal(0, outputs[5]);
            assert.equal(-8, outputs[6]);
            assert.equal(8, outputs[7]);
        });
    });
});

