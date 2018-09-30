'use strict';

// const Transformer = require('../Transformer');
const fs = require('fs');
const BitMapData = require('../lib/bit-map-data');
const Transformer = require('../Transformer');

let originalHouse;
let transformedHouse;

describe('Testing transformations', () => {
  test('expect: no parameters to return 70', () => {
    expect(Transformer.run()).toEqual(70);
  });

  test('expect: if only 1 parameter is given, also return 70', () => {
    expect(Transformer.run('src/assets/house.bmp')).toEqual(70);
  });

  test('darken transformation, expect: any value of the originalHouse.colorTableBuffer to have been reduced by 125, no lower than 0', (done) => {
    fs.readFile(`${__dirname}/../assets/house.bmp`, (error, buffer) => {
      if (error) {
        throw error;
      }

      originalHouse = new BitMapData(buffer);
      transformedHouse = originalHouse.darken();
      // transformedHouse = new BitMapData(buffer, 'darken');
      // return originalHouse.darken();
      // .then(() => {
      for (let i = 0; i < originalHouse.colorTableBuffer; i++) {
        if (originalHouse.colorTableBuffer[i] > 125) {
          expect(originalHouse.colorTableBuffer[i])
            .toEqual(transformedHouse.colorTableBuffer[i] - 125);
        } else {
          expect(transformedHouse.colorTableBuffer[i])
            .toEqual(0);
        }
      }
      done();
      // });
    });
  });

  // test('blackAndWhite transformation', (done) => {
  //   fs.readFile(`${__dirname}/../assets/house.bmp`, (error, buffer) => {
  //     if (error) {
  //       throw error;
  //     }
  //
  //     originalHouse = new BitMapData(buffer);
  //     transformedHouse = new BitMapData(buffer, 'blackAndWhite');
  //     return transformedHouse.blackAndWhite()
  //       .then(() => {
  //         for (let i = 0; i < originalHouse.colorTableBuffer; i++) {
  //           if (originalHouse.colorTableBuffer[i] < 100) {
  //             expect(transformedHouse.colorTableBuffer[i])
  //               .toEqual(0);
  //           } else {
  //             expect(transformedHouse.colorTableBuffer[i])
  //               .toEqual(255);
  //           }
  //         }
  //         done();
  //       });
  //   });
  // });
  //
  // test('blueScale transformation', (done) => {
  //   fs.readFile(`${__dirname}/../assets/house.bmp`, (error, buffer) => {
  //     if (error) {
  //       throw error;
  //     }
  //
  //     originalHouse = new BitMapData(buffer);
  //     transformedHouse = new BitMapData(buffer, 'blueScale');
  //     return transformedHouse.blueScale()
  //       .then(() => {
  //         expect(transformedHouse.colorTableBuffer[2])
  //           .toEqual(0);
  //         expect(transformedHouse.colorTableBuffer[6])
  //           .toEqual(0);
  //         expect(transformedHouse.colorTableBuffer[10])
  //           .toEqual(0);
  //         expect(transformedHouse.colorTableBuffer[18])
  //           .toEqual(0);
  //         expect(transformedHouse.colorTableBuffer[30])
  //           .toEqual(0);
  //         expect(transformedHouse.colorTableBuffer[1])
  //           .toEqual(originalHouse.colorTableBuffer[1]);
  //         expect(transformedHouse.colorTableBuffer[7])
  //           .toEqual(originalHouse.colorTableBuffer[7]);
  //         expect(transformedHouse.colorTableBuffer[13])
  //           .toEqual(originalHouse.colorTableBuffer[13]);
  //         done();
  //       });
  //   });
  // });
});
