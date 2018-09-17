'use strict';

// import BitMapData from './lib/parse-bitmap';
const fs = require('fs');
const BitMapData = require('./lib/parse-bitmap');

function endProgram(reason) {
  // use exit code for jest test
  if (reason === 'lackingInput') {
    process.exit(70);
  }

  if (reason === 'cleanComplete') {
    process.exit(0);
  }

  if (reason === 'debug') {
    // can be used for debugging up to a certain point
    process.exit(1);
  }
}

// set / assign -- input variables
const fileName = process.argv[2] ? process.argv[2] : false;
const outputName = process.argv[3] ? process.argv[3] : false;
// if either fileName or outputName is blank then return null and stop program
if (fileName === false || outputName === false) {
  console.log('\nStopping program execution. Must pass fileName and outputName.\n');
  console.log('syntax:\n');
  console.log('< > = required');
  console.log('[ ] = optional');
  console.log('* if no transformation is given, program defaults to cloning the image\n');
  console.log('node main.js < fileName > < outputName > [ transformation ]\n');
  console.log('example run:\n');
  console.log('node main.js src/main.js ./src/assets/house.bmp ./test.bmp blackAndWhite\n');
  endProgram('lackingInput');
}

// if blank assumed that you just want the image copied and no transformation will happen
const transformationType = (process.argv[4]) ? process.argv[4] : false;

// used to convert shorthand to longhand, otherwise longhand will be attempted (see recordShortHand)
const transformation = {
  bw: 'blackAndWhite',
  r90: 'rotate90',
  // etc... add more shorthand here as needed
};

function warnNoTransformationGiven() {
  console.log(`\nNo transformation parameter given. ${fileName} was simply copied to: ${outputName}\n`);
}

if (transformationType === false) {
  warnNoTransformationGiven();
}

// begin read, clone BitMapData, and run any passed transformation
//   ** note: can be setup to perform multiple transformation as a stretch goal,
//     ** but currently only performs 1 if given, per run...
fs.readFile(fileName, (err, buffer) => {
  if (err) throw err;
  const bitMapObject = new BitMapData(buffer, {}, buffer);
  const parsedData = bitMapObject.mapData(buffer);

  // perform given transform
  const recordShortHand = (transformation[`${transformationType}`]) ? transformation[`${transformationType}`] : false;
  let modifiedData;

  if (recordShortHand) {
    console.log(recordShortHand);
    // endProgram('debug');
    modifiedData = bitMapObject[`${recordShortHand}`](buffer);
    console.log(modifiedData);
    fs.writeFile(outputName, modifiedData, (error) => {
      if (error) throw error;
    });
    return modifiedData;
  }

  if (transformationType) {
    console.log(transformationType);
    // if recordShortHand is blank, then try to use given type as is
    modifiedData = bitMapObject[`${transformationType}`](buffer);
    fs.writeFile(outputName, modifiedData, (error) => {
      if (error) throw error;
    });
    return modifiedData;
  }

  // else ...
  console.log('simply cloning');
  // or, if shorthand cannot be extracted and transformationType was not given (false),
  // then just clone the image
  fs.writeFile(outputName, buffer, (error) => {
    if (error) throw error;
  });
  //! probably won't be needed in final version, used for debugging atm
  fs.writeFile('test.txt', Object.values(parsedData.colorTable), (error) => {
    if (error) throw error;
  });
  return buffer;
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
