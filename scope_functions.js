// Scope Functions for JavaScript
// The Kotlin standard library contains several functions whose sole purpose is to execute a block of code within the context of an object. When you call such a function on an object with a lambda expression provided, it forms a temporary scope. In this scope, you can access the object without its name. Such functions are called scope functions. There are five of them: let, run, with, apply, and also.

// Basically, these functions do the same: execute a block of code on an object. What's different is how this object becomes available inside the block and what is the result of the whole expression.
// ref: https://kotlinlang.org/docs/reference/scope-functions.html
// Here's a typical usage of a scope function for JavaScript:

Object.prototype.let = function (callback) {
    return callback.apply(this, [this])
}

Object.prototype.applyy = function (callback) {
    callback.apply(this, [this])
    return this
}

class TrashCan {
    recycle() {}
    pick() {}
    clear() {}
}

class Player {
    stop() {
        console.log('stop')
    }

    play() {
        console.log('play')
    }
}

// demo reduce declaration
// ************************************************************************************

// before
var player = new Player;
player.play()
player.stop()
var trashCan = new TrashCan;
trashCan.recycle(player);
trashCan.pick(player);
player.stop()
trashCan.clear()

// after
// var free, isolated scope
new Player().let(player => {
    player.play()
    player.stop()
    new TrashCan().let(it => {
        it.recycle(player)
        it.pick(player)
        player.stop()
        it.clear()
    })
});

// or

new Player().let(player => {
    player.play()
    player.stop()
    let trashCan = new TrashCan().applyy(_ => {
        _.recycle(player)
        _.pick(player)
    })
    player.stop()
    trashCan.clear()
});

// demo chain
// *************************************************************************
// after
[{
    id: 'foo1',
    value: 10
}, {
    id: 'foo2',
    value: 20
}, ].let(it => {

        console.log(it[1].value * 2)
        return it.map((v, i) => i * 10)

    }).let(it => {

        // [0, 10]
        console.log(it)
        return 3
    }).applyy(function (_) {

        // Number(3)
        console.log(this)

    }).let(it => {

        // Number(3)
        console.log(it)

        // "3"
        return it.toFixed()
    }).let(it => {
        return new Player
    })
    .applyy(_ => {

        // window in arrow fn
        console.log(this)

        // console.log('play')
        _.play()
    })

// before

var a = [{
        id: 'foo1',
        value: 10
    },
    {
        id: 'foo2',
        value: 20
    },
]

console.log(a[1].value * 2)

var b = a.map((v, i) => i * 10)
console.log(b)
var c = 3
console.log(c)
var d = c.toFixed()
var e = new Player
// console.log('play')
e.play()