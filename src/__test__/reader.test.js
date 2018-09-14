'use strict';

const _reader = require('../lib/reader');
// txt file to test with
const aaPath = `${__dirname}/../data/AA.txt`;

describe('#Testing reader.js functionality...', () => {
  test('The first 20 characters of a file should read...', (done) => {
    _reader.readFirstNCharactersAsync(aaPath, 20, (data) => {
      expect(data).toEqual('The text of the 1st ');
      done();
    });
  });
  test('Test if bad file path returns exact error code ENOENT', (done) => {
    _reader.readFirstNCharactersAsync('../newFile.txt', 20, (err) => {
      expect(err.code).toBe('ENOENT');
      done();
    });
  });
  test('Test that if file path is bad that it is an error object', (done) => {
    _reader.readFirstNCharactersAsync('../newFile.txt', 20, (err) => {
      expect(typeof err).toBe('object');
      done();
    });
  });
});
