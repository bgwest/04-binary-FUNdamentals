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
    let colorArray = Object.values(this.mapDataObj.colorTable);
    let colorIndex = 0;
    let colorIterate = this.COLOR_TABLE_OFFSET;
    while (colorIterate <= this.COLOR_TABLE_SIZE) {
      this.buffer.writeInt8(0, colorIterate);
      colorIterate += 1;
    }
    console.log('buffer object inside of parse-bitmap');
    // console.log(parsedBitmap.colorTable);
    return this.mapDataObj;
  }
}

module.exports = BitMapData;
