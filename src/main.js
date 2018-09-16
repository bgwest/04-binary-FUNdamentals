'use strict';

// import BitMapData from './lib/parse-bitmap';
const fs = require('fs');
const BitMapData = require('./lib/parse-bitmap');

// const parseBitmap = require('./lib/parse-bitmap');

// set / assign -- input variables
const fileName = process.argv[2];
const outputName = process.argv[3];
const transformationType = process.argv[4];

// const fileName = './assets/house.bmp';
// const outputName = './test.bmp';
// const transformationType = 'rotate90';

console.log(`param1 = ${fileName}`);
console.log(`param2 = ${outputName}`);
console.log(`param3 = ${transformationType}`);

fs.readFile(fileName, (err, data) => {
  if (err) throw err;
  console.log(data);
  const bitMapObject = new BitMapData(data, {});
  const parsedData = bitMapObject.mapData(data);
  console.log(parsedData);
  fs.writeFile(outputName, data, (error) => {
    if (error) throw error;
  });
  // let ctDataConverted;
  // for (let index = 0; index <= 255; index++) {
  //   ctDataConverted += ` ${parsedData.colorTable.readInt32LE(2)}`;
  // }
  fs.writeFile('test.txt', Object.values(parsedData.colorTable), (error) => {
    if (error) throw error;
  });
  console.log('inside readFile function.');
  console.log(parsedData);
});

// const testBuffer = Buffer.from('The Hound');
//------------------------------------------------------------------------------------------------
// //! Vinicio - this would print a hex representation of the buffer
// console.log(testBuffer);
// console.log(testBuffer.toString());
//------------------------------------------------------------------------------------------------
// //! Vinicio  if you access a buffer using the array operator [], you'll get a BASE 10 value
// //! DECIMAL(84) === HEXADECIMAL(54)
// console.log(testBuffer[0]);
//------------------------------------------------------------------------------------------------
// console.log(testBuffer.readUInt8(4));
// //! Vinicio - we know that WE ARE LITTLE ENDIAN
// //! VInicio - we know that 16 bits equal to 2 bytes
// console.log(testBuffer.readUInt16LE(0));
// //! Vinicio - we that 32 bits equal 4 bytes = 8 nibbles
// //! Vinicio - in the calculator (hex), we type: 20 65 68 54
// console.log(testBuffer.readUInt32LE(0));
//------------------------------------------------------------------------------------------------
// // Writing 8 bits
//------------------------------------------------------------------------------------------------
// testBuffer.writeUInt8(70, 0);
// console.log(testBuffer.toString());
// testBuffer[0] = 65;
// console.log(testBuffer.toString());
// testBuffer.write('Gregor   ');
// console.log(testBuffer.toString());
// console.log(testBuffer);

// fs.readFile(`${__dirname}/assets/litany.txt`, (error, buffer) => {
//   if (error) {
//     throw error;
//   }
//   // console.log(buffer);
//   // console.log(buffer.toString());
//   // // buffer[0] = 50;
//   // // buffer[1] = 100;
//   // buffer.writeInt16LE(123, 0);
//   // console.log(buffer.toString());
//
//   //! Vinicio - spoiler alert, this is not working code
//   // for (let i = 0; i < buffer.length / 3; i + = 3) {
//   //   //! Vinicio - THIS IS WHERE YOU CHANGE COLORS
//   //   //! Red Green Blue
//   //   buffer[i] = i % 255; //! Vinicio - Red
//   //   buffer[i + 1] = i % 255; //! Vinicio - Green
//   //   buffer[i + 2] = i % 255; //! Vinicio  - Blue
//   //   buffer[i] = 255; //! Vinicio - Red
//   //   buffer[i + 1] = 0; //! Vinicio - Green
//   //   buffer[i + 2] = 0; //! Vinicio  - Blue
//   // }
//   // console.log(buffer.toString());
// });
