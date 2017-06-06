var sinon = require("sinon");
var mute = require("../index.js");
var assert = require("assert");

var sandbox = sinon.sandbox.create();

describe("mocha-mute promise", function () {

    describe("fulfilled promises", function () {
        it("should write to stdout before mute", function () {
            return runTest({
                shouldShow: true,
                throws: false
            });
        });

        it("should mute promises", function () {
            return runTest({
                shouldShow: false,
                throws: false
            });
        });

        it("should write to stdout after mute", function () {
            return runTest({
                shouldShow: true,
                throws: false
            });
        });
    });

    describe("rejected promises", function () {
        it("should write to stdout before mute", function () {
            return runTest({
                shouldShow: true,
                throws: false
            });
        });

        it("should mute promises", function () {
            return runTest({
                shouldShow: false,
                throws: true
            });
        });

        it("should write to stdout after mute", function () {
            return runTest({
                shouldShow: true,
                throws: false
            });
        });
    });

    function runTest(options) {
        var message;
        if (options.shouldShow) {
            message = "Should be showing";
        } else {
            message = "Should not be showing";
        }

        var innerFn;
        if (options.throws) {
            innerFn = function () {
                throw new Error("Promise is expected to fail.");
            }
        } else {
            innerFn = function () {
                console.log(message)
            }
        }

        var promiseFn;
        if (options.shouldShow) {
            promiseFn = function () {
                return Promise.resolve().then(innerFn);
            }
        } else {
            promiseFn = function () {
                return mute.promise(Promise.resolve().then(innerFn))
            }
        }

        var fail = function () {
            sandbox.restore();
            assert.fail("Function should throw.");
        };
        var verifier = function () {
            var called = process.stdout.write.calledWithExactly(message + "\n");
            var args = process.stdout.write.getCalls();
            sandbox.restore();
            assert.equal(called, options.shouldShow, require("util").inspect(args));
        };

        var thenFn;
        var catchFn;
        if (options.throws) {
            thenFn = fail;
            catchFn = verifier;
        } else {
            thenFn = verifier;
            catchFn = fail;
        }

        return Promise.resolve().then(function () {
            sandbox.stub(process.stdout);
        }).then(promiseFn).then(thenFn).catch(catchFn);
    }
});