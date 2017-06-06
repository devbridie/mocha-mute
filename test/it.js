var mute = require("../index.js");

describe("it", function () {
    beforeEach(function() {
        console.log("Before test");
    });
    afterEach(function() {
        console.log("After test");
        console.log("");
    });

    mute.it("should work with sync no done", function () {
        console.log("Should not be visible")
    });

    mute.it("should work with async done", function (done) {
        setTimeout(function() {
            console.log("Should not be visible");
            done();
        });
    });

    mute.it("should work with fulfilled promises", function () {
        return new Promise(function (resolve) {
            setTimeout(function() {
                console.log("Should not be visible");
                resolve("answer")
            }, 1000)
        })
    });

    // mute.it("should work with rejected promises", function () {
    //     Return new Promise(function (resolve, reject) {
    //         SetTimeout(function() {
    //             Console.log("Should not be visible");
    //             Reject(new Error("answer"));
    //         }, 1000)
    //     });
    // });
});