/**
 * 加算器テストコード
 * $ node --test
 */

import test from 'node:test';
import assert from 'node:assert';

import { isBool, halfAdder, fullAdder, numberAdder } from './logical-add.js';

test('isBool is true test', (t) => {
  assert.strictEqual(isBool(true), true);
  assert.strictEqual(isBool(false), true);
  assert.strictEqual(isBool(0), true);
  assert.strictEqual(isBool(1), true);
});

test('isBool is false test', (t) => {
  assert.strictEqual(isBool(-1), false);
  assert.strictEqual(isBool(2), false);
  assert.strictEqual(isBool(null), false);
  assert.strictEqual(isBool(undefined), false);
  assert.strictEqual(isBool('0'), false);
  assert.strictEqual(isBool('1'), false);
});

test('halfAdder(半加算器) test', (t) => {
  // 配列の比較はdeepStrictEqualを利用する
  assert.deepStrictEqual(halfAdder(0, 0), [0, 0]);
  assert.deepStrictEqual(halfAdder(1, 0), [0, 1]);
  assert.deepStrictEqual(halfAdder(0, 1), [0, 1]);
  assert.deepStrictEqual(halfAdder(1, 1), [1, 0]);

  assert.deepStrictEqual(halfAdder(false, false), [0, 0]);
  assert.deepStrictEqual(halfAdder(true, false), [0, 1]);
  assert.deepStrictEqual(halfAdder(false, true), [0, 1]);
  assert.deepStrictEqual(halfAdder(true, true), [1, 0]);
});

test('Out of range test', (t) => {
  assert.throws(() => {
    halfAdder(2, 0);
  });

  assert.throws(() => {
    halfAdder(1, null);
  });

  assert.throws(() => {
    halfAdder(1, '0');
  });
});

test('fullAdder(全加算器) test', (t) => {
  // 配列の比較はdeepStrictEqualを利用する
  assert.deepStrictEqual(fullAdder(0, 0, 0), [0, 0]);
  assert.deepStrictEqual(fullAdder(1, 0, 0), [0, 1]);
  assert.deepStrictEqual(fullAdder(0, 1, 1), [1, 0]);
  assert.deepStrictEqual(fullAdder(1, 1, 1), [1, 1]);

  assert.deepStrictEqual(fullAdder(false, false, true), [0, 1]);
  assert.deepStrictEqual(fullAdder(true, false, true), [1, 0]);
  assert.deepStrictEqual(fullAdder(false, true, false), [0, 1]);
  assert.deepStrictEqual(fullAdder(true, true, false), [1, 0]);
});

test('numberAdder test', (t) => {
  assert.strictEqual(numberAdder(0, 0), 0);
  assert.strictEqual(numberAdder(0, 1), 1);
  assert.strictEqual(numberAdder(1, 1), 2);
  assert.strictEqual(numberAdder(10, 5), 15);
  assert.strictEqual(numberAdder(15, 1), 16);
  // integer max
  assert.strictEqual(numberAdder(2_147_483_646, 1), 2_147_483_647);
  // overflow
  assert.notEqual(numberAdder(2_147_483_647, 1), 2_147_483_648);
});
