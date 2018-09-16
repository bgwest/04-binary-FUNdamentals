'use strict';

class BitMapData {
  constructor(buffer, mapDataObj) {
    this.FILE_SIZE_OFFSET = 2;
    this.HEIGHT_OFFSET = 22;
    this.COLOR_TABLE_OFFSET = 54;
    this.COLOR_TABLE_SIZE = 54 + 256;
    this.buffer = buffer;
    this.mapDataObj = mapDataObj;
  }

  get getMapData() {
    return this.mapData;
  }

  mapData() {
    this.mapDataObj.type = this.buffer.toString('utf-8', 0, 2);
    this.mapDataObj.fileSizeInBytes = this.buffer.readInt32LE(this.FILE_SIZE_OFFSET);
    this.mapDataObj.height = this.buffer.readInt32LE(this.HEIGHT_OFFSET);
    this.mapDataObj.colorTable = this.buffer.slice(this.COLOR_TABLE_OFFSET, this.COLOR_TABLE_SIZE);
    // console.log(`colorTable length ${this.mapDataObj.colorTable[10]}`);
    console.log('buffer object inside of parse-bitmap');
    // console.log(parsedBitmap.colorTable);
    return this.mapDataObj;
  }
}

module.exports = BitMapData;

// export default class { BitMapData };

// parsedBitmap.type = buffer.toString('utf-8', 0, 2);
// parsedBitmap.fileSizeInBytes = buffer.readInt32LE(FILE_SIZE_OFFSET);
// parsedBitmap.height = buffer.readInt32LE(HEIGHT_OFFSET);
// parsedBitmap.colorTable = buffer.slice(COLOR_TABLE_OFFSET, COLOR_TABLE_SIZE);
// console.log('buffer object inside of parse-bitmap');
// console.log(parsedBitmap.colorTable);
