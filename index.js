var mute = require("mute");

function isPromise(value) {
    return typeof value === 'object' && typeof value.then === 'function';
}

function muteit(name, fn) {
    if (fn.length) {
        it(name, function (done) {
            var unmute = mute();

            function wrappedDone() {
                unmute();
                done();
            }

            fn.call(this, wrappedDone);
        });
    } else {
        it(name, function () {
            var unmute = mute();
            var out = fn.call(this);
            if (isPromise(out)) {
                return mutePromise(out);
            } else {
                unmute();
            }
        })
    }
}

function mutePromise(promise) {
    return new Promise(function (resolve, reject) {
        var unmute = mute();
        promise.then(function (r) {
            unmute();
            resolve(r);
        }).catch(function (e) {
            unmute();
            reject(e);
        })
    })
}

function muteFunction(action) {
    var unmute = mute();
    action();
    unmute();
}

module.exports = muteFunction;
module.exports.it = muteit;
module.exports.promise = mutePromise;