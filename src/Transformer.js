'use strict';

// module version of Transformer-cli.js
// for integrating module into other node modules and or testing with jest
const Transformer = {};

Transformer.compareBuffer = (originalImage, newlyCreatedImage) => {
  // use this to compare original and new image for jest tests

};

Transformer.run = (param1, param2, param3) => {
  const fs = require('fs');
  const parseBitmap = require('./lib/parse-bitmap');

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
  const fileName = (param1 !== undefined) ? param1 : false;
  const outputName = (param2 !== undefined) ? param2 : false;
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
    // endProgram('lackingInput');
    return 70;
  }

  // if blank assumed that you just want the image copied and no transformation will happen
  const transformationType = (param3 !== undefined) ? param3 : false;

  // used to convert shorthand to longhand, otherwise
  //   longhand will be attempted (see recordShortHand)
  const transformation = {
    bw: 'blackAndWhite',
    rand: 'randomTransform',
    night: 'nightVision',
    nightvision: 'nightVision',
    speck: 'speckles',
    dark: 'darken',
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

  // for capturing given transform
  const recordShortHand = (transformation[`${transformationType}`]) ? transformation[`${transformationType}`] : false;

  if (recordShortHand) {
    console.log(`recordShortHand: ${recordShortHand}`);
    // endProgram('debug');
    // modifiedData = bitMapObject[`${recordShortHand}`](buffer);
    // console.log(modifiedData);
    const writeFile = (data, callback) => {
      fs.writeFile(`${__dirname}/assets/${outputName}`, data, (error) => {
        if (error) {
          throw error;
        }
        return callback;
      });
    };

    fs.readFile(`${__dirname}/assets/${fileName}`, (error, buffer) => {
      if (error) {
        throw error;
      }
      parseBitmap.parse(buffer, recordShortHand, writeFile);
    });
  }

  if (!recordShortHand) {
    console.log(`transformationType: ${transformationType}`);
    // if recordShortHand is blank, then try to use given type as is
    const writeFile = (data, callback) => {
      fs.writeFile(`${__dirname}/assets/${outputName}`, data, (error) => {
        if (error) {
          throw error;
        }
        return callback;
      });
    };

    fs.readFile(`${__dirname}/assets/${fileName}`, (error, buffer) => {
      if (error) {
        throw error;
      }
      parseBitmap.parse(buffer, transformationType, writeFile);
    });
  }
};

module.exports = Transformer;

// need to add default cloning

// // else ...
// console.log('simply cloning');
// // or, if shorthand cannot be extracted and transformationType was not given (false),
// // then just clone the image
// fs.writeFile(outputName, buffer, (error) => {
//   if (error) throw error;
// });
// //! probably won't be needed in final version, used for debugging atm
// fs.writeFile('test.txt', Object.values(parsedData.colorTable), (error) => {
//   if (error) throw error;
// });
// return buffer;
