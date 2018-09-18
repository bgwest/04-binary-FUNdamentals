'use strict';

const Transformer = require('../Transformer');
const parseBitmap = require('../lib/parse-bitmap');

// WORK TO BE DONE FOR RESUBMIT - Kris
describe('Testing Transformer.js', () => {
  test('expect: no parameters to return 70', () => {
    expect(Transformer.run()).toEqual(70);
  });
  test('expect: if only 1 parameter is given, also return 70', () => {
    expect(Transformer.run('src/assets/house.bmp')).toEqual(70);
  });
});
