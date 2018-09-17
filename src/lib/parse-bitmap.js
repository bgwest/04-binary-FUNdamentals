'use strict';

class BitMapData {
  constructor(buffer, mapDataObj, modifiedData) {
    this.FILE_SIZE_OFFSET = 2;
    this.HEIGHT_OFFSET = 22;
    this.COLOR_TABLE_OFFSET = 54;
    this.COLOR_TABLE_SIZE = 54 + 256;
    this.buffer = buffer;
    this.mapDataObj = mapDataObj;
    this.modifiedData = modifiedData;
  }

  get getMapData() {
    return this.mapData;
  }

  mapData() {
    console.log('buffer object inside of parse-bitmap');
    this.mapDataObj.type = this.buffer.toString('utf-8', 0, 2);
    this.mapDataObj.fileSizeInBytes = this.buffer.readInt32LE(this.FILE_SIZE_OFFSET);
    this.mapDataObj.height = this.buffer.readInt32LE(this.HEIGHT_OFFSET);
    this.mapDataObj.colorTable = this.buffer.slice(this.COLOR_TABLE_OFFSET, this.COLOR_TABLE_SIZE);
    return this.mapDataObj;
  }

  blackAndWhite() {
    let colorIterate = this.COLOR_TABLE_OFFSET;
    while (colorIterate <= this.COLOR_TABLE_SIZE) {
      this.modifiedData.writeInt8(0, colorIterate);
      colorIterate += 1;
    }
    return this.modifiedData;
  }
}

module.exports = BitMapData;
