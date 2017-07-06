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
            assert.deepEqual([4, 8, 9], outputs);
        });


        it('sub', () => {
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
            assert.deepEqual([7, -7, -2, 2, 0, 0, -8, 8], outputs);
        });

        it('reverse', () => {
            let commands = [
                new Command(MnemonicType.copyfrom, 14),
                new Command(MnemonicType.copyto, 13),
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.jumpIfZero, 7),
                new Command(MnemonicType.pCopyto, 13),
                new Command(MnemonicType.bumpPlus, 13),
                new Command(MnemonicType.jump, 2),
                new Command(MnemonicType.bumpMinus, 13),
                new Command(MnemonicType.jumpIfNeg, 0),
                new Command(MnemonicType.pCopyfrom, 13),
                new Command(MnemonicType.outbox, null),
                new Command(MnemonicType.copyfrom, 13),
                new Command(MnemonicType.jump, 7),
            ];
            let registers = [
                null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, 0,
            ];
            let inputs = [
                "I", "T", 0,
                "Y", "E", "S", 0,
                "T", "O", "O", "L", 0
            ];
            let outputCount = 9;

            let machine = new Machine(registers, inputs, outputCount);
            let outputs = machine.run(commands);
            assert.deepEqual(["T", "I", "S", "E", "Y", "L", "O", "O", "T"], outputs);
        });

        it('exclude vowel', () => {
            let commands = [
                new Command(MnemonicType.copyfrom, 5),
                new Command(MnemonicType.copyto, 7),
                new Command(MnemonicType.copyto, 8),
                new Command(MnemonicType.inbox, null),
                new Command(MnemonicType.copyto, 6),
                new Command(MnemonicType.pCopyfrom, 7),
                new Command(MnemonicType.jumpIfZero, 14),
                new Command(MnemonicType.sub, 6),
                new Command(MnemonicType.jumpIfZero, 11),
                new Command(MnemonicType.bumpPlus, 7),
                new Command(MnemonicType.jump, 5),
                new Command(MnemonicType.bumpPlus, 8),
                new Command(MnemonicType.bumpPlus, 7),
                new Command(MnemonicType.jump, 5),
                new Command(MnemonicType.copyfrom, 8),
                new Command(MnemonicType.jumpIfZero, 17),
                new Command(MnemonicType.jump, 0),
                new Command(MnemonicType.copyfrom, 6),
                new Command(MnemonicType.outbox, null),
                new Command(MnemonicType.jump, 0),
            ];
            let registers = [
                "A", "E", "I", "O", "U",
                0, null, null, null, null,
            ];
            let inputs = [
                "M", "E", "O", "I", "L", "M", "A", "N", "Y",
            ];
            let outputCount = 5;

            let machine = new Machine(registers, inputs, outputCount);
            let outputs = machine.run(commands);
            assert.deepEqual(["M", "L", "M", "N", "Y"], outputs);
        });

    });
});

