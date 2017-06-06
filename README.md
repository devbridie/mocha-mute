# `mocha-mute`
[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url]

Provides an alternative test runner for Mocha which mutes test contents. Uses [`mute`](https://www.npmjs.com/package/mute) to mute streams.

## Install

```
$ npm install --save mocha-mute
```

## Usage

```js
var mute = require('mocha-mute');

describe("Noisey module test", function() {
    beforeEach(function() {
        mute(function() {
            console.log("Will not be displayed");
        })
    });

    mute.it("should mute sync tests", function() {
        console.log("Will not be displayed");
    }

    mute.it("should mute async tests with done", function(done) {
        setTimeout(function() {
            console.log("Will not be displayed");
            done();
        }, 100);
    }

    mute.it("should mute async tests with Promise", function() {
        return new Promise(function(resolve, reject) {
           setTimeout(function() {
                console.log("Will not be displayed");
                resolve();
            }, 100);
        });
    }
});
```

## API

### `(fn): void`
Runs a function `fn`, muting all output.

### `it(...): void`
Uses the same specification as mocha's `it`. Mutes the contents of the test.

### `promise(promise): Promise`
Wraps a promise `promise`, muting all output during the execution of the promise.

## Test

```
$ npm test
```

## Contribute

Pull requests are accepted.

----

[downloads-img]: http://img.shields.io/npm/dm/mocha-mute.svg?style=flat-square
[npm-img]:       http://img.shields.io/npm/v/mocha-mute.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/mocha-mute