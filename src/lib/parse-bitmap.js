'use strict';

const parseBitmap = module.exports = {};

parseBitmap.parse = (buffer, transformation, callback) => {
  const FILE_SIZE_OFFSET = 2;
  const COLOR_TABLE_OFFSET = 54;
  const HEIGHT_OFFSET = 22;

  // Constructor
  class BitMapData {
    constructor(mapDataObj) {
      this.type = mapDataObj.toString('utf-8', 0, 2);
      this.fileSizeInBytes = mapDataObj.readInt32LE(FILE_SIZE_OFFSET);
      this.pixelArray = mapDataObj.slice(this.offset, this.fileSizeInBytes);
      this.bitmapHeader = mapDataObj.readInt32LE(14);
      this.height = mapDataObj.slice(HEIGHT_OFFSET).readInt16LE(0);
      this.colorTableOffset = mapDataObj.slice(COLOR_TABLE_OFFSET);
      this.offset = mapDataObj.readInt32LE(10);
      this.buffer = mapDataObj;
      this.colorTableBuffer = mapDataObj.slice(this.bitmapHeader + 14, this.offset);
      this.method = transformation;
      this.callback = callback;
    }
    // class BitMapData {
    //   constructor(buffer, mapDatamapDataObj, modifiedData) {
    //     this.FILE_SIZE_OFFSET = 2;
    //     this.HEIGHT_OFFSET = 22;
    //     this.COLOR_TABLE_OFFSET = 54;
    //     this.COLOR_TABLE_SIZE = 1024; // 54 + 256
    //     this.buffer = buffer;
    //     this.mapDatamapDataObj = mapDatamapDataObj;
    //     this.modifiedData = modifiedData;
    //   }

    //   get getMapData() {
    //     return this.mapData;
    //   }

    //   mapData() {
    //     console.log('buffer mapDataObject inside of parse-bitmap');
    //     this.mapDatamapDataObj.type = this.buffer.toString('utf-8', 0, 2);
    //     this.mapDatamapDataObj.fileSizeInBytes = this.buffer.readInt32LE(this.FILE_SIZE_OFFSET);
    //     this.mapDatamapDataObj.height = this.buffer.readInt32LE(this.HEIGHT_OFFSET);
    //     this.mapDatamapDataObj.colorTable = this.buffer.slice(this.COLOR_TABLE_OFFSET, this.COLOR_TABLE_SIZE); //eslint-disable-line
    //     return this.mapDatamapDataObj;
    //   }
    invert() {
      console.log(this.pixelArray, 'this is pixel array');
      this.pixelArray.reverse();
      return this;
    }

    nightVision() {
      for (let i = 0; i < this.colorTableBuffer.length; i += 4) {
        this.colorTableBuffer[i + 12] = 1;
        this.colorTableBuffer[i + 6] = 1;
      }
      console.log('Performing NightVision Transform');
      return this;
    }

    blackAndWhite() {
      // for loop for black and white transformation would go here!
      return this;
    }

    randomTransform() {
      for (let i = 0; i < this.colorTableBuffer.length; i += 4) {
        this.colorTableBuffer[i] = 25;
        this.colorTableBuffer[i] = 1;
        this.colorTableBuffer[i - 1] = 0;
      }
      console.log('Performing Random Transform');
      return this;
    }

    anotherRandomTransform() {
      for (let i = 0; i < this.colorTableBuffer.length; i += 6) {
        this.colorTableBuffer[i] = 6;
        this.colorTableBuffer[i] = 1;
        this.colorTableBuffer[i - 1] = 0;
      }
    }

    makeTransform() {
      this[this.method]();
      console.log('TRANSFORMATION COMPLETE!');
    }
  }

  // Creating a new instance of our constructor
  const bitmapFile = new BitMapData(buffer);

  (bitmapFile.makeTransform)();

  const transformedBitmap = Buffer.from(bitmapFile.buffer, 'hex');

  return callback(transformedBitmap);
};
