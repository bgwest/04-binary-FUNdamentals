'use strict';

const parseBitmap = module.exports = {};
const BitMapData = require('./bit-map-data');

parseBitmap.parse = (buffer, transformation, callback) => {
  // Creating a new instance of our constructor
  const bitmapFile = new BitMapData(buffer, transformation, callback);

  (bitmapFile.makeTransform)();

  const transformedBitmap = Buffer.from(bitmapFile.buffer, 'hex');

  return callback(transformedBitmap);
};
