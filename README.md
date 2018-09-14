# reader.js - an fs reader module

## Overview

- create a reader.js module that exports a single function. 

- The reader module should take an array of three file paths and resolve a mapped array of strings loaded from each file using an error-first callback. 

- The string data should be in the same order as the file path data (mapped). If an error occurs, it should immediately reject the error using the callback and stop execution.

 - The file reader module should have the function signature (paths, callback) => undefined
 
 - On failure, the file reader module should invoke the callback with an error callback(error)
 
 - On success, the file reader module should invoke the callback with null as the first parameter and the result as the second parameter - callback(null, result)

### Prerequisites

Example:
```
```

### Tests Performed with Jest
- The file reader module should have the function signature (paths, callback) => undefined
- On failure, the file reader module should invoke the callback with an error callback(error)
- On success, the file reader module should invoke the callback with null as the first parameter and the result as the second parameter - callback(null, result)

### Installing

To use this in your code:

- git clone repo 
- npm install 
- require('../src/lib/reader')

## Built With

* nodejs
* Eslint
* jest

## Contributing

Please feel free to contribute. Master branch auto merge locked for approval for non-contributors.

## Versioning

*n/a*

## Authors

![CF](http://i.imgur.com/7v5ASc8.png) **Benjamin West** 

## License

*none*

## Travis CI
[![Build Status](https://travis-ci.com/bgwest/03-async-and-callbacks.svg?branch=master)](https://travis-ci.com/bgwest/03-async-and-callbacks)