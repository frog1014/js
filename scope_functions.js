// Scope Functions for JavaScript

// The Kotlin standard library contains several functions whose sole purpose is to execute a block of code within the context of an object. When you call such a function on an object with a lambda expression provided, it forms a temporary scope. In this scope, you can access the object without its name. Such functions are called scope functions. There are five of them: let, run, with, apply, and also.

// Basically, these functions do the same: execute a block of code on an object. What's different is how this object becomes available inside the block and what is the result of the whole expression.
// more details for official tutorial, ref: https://kotlinlang.org/docs/reference/scope-functions.html

// Here're some typical usages of a scope function for JavaScript:


'use strict';
// the 2 extensions only support non-null object

// return what you return in callback
Object.prototype.let = function (callback) {
    return callback.apply(this, [toBooleanValue(this)])
}


// apply is preserved from JS
// return this
Object.prototype.applyy = function (callback) {
    callback.apply(this, [toBooleanValue(this)])
    return this
}

// a transformer for getting the primitive value of a Boolean object
function toBooleanValue(obj) {
    return obj instanceof Boolean ? obj.valueOf() : obj
}


// ******************************** example below *******************************************************

// *************************************** run in browser***********************************************
if (typeof window !== 'undefined') {
    // before
    var body = document.querySelector('body');
    body.innerHTML = "popup_splash_prevent_close_tab".toLowerCase()
    body.setAttribute('data-tip', "popup_splash_prevent_close_tab_toolip")

    // after
    document.querySelector('body').applyy(_ => {
        _.innerHTML = "popup_splash_prevent_close_tab".toLowerCase()
        _.setAttribute('data-tip', "popup_splash_prevent_close_tab_toolip")
    });
}


// **************************************can run by Node.js********************************************

// do on a nullable object
// no works
try {
    [3, 2, 3, 44, 23, 423, 4].find(e => e == 1000).let(_ => {
        // throw a exception cause of "[3, 2, 3, 44, 23, 423, 4].find(e => e == 1000)" is undefined
    })
} catch (e) {
    console.error(e)
}

// works
([3, 2, 3, 44, 23, 423, 4].find(e => e == 1000) || false).let(it => {
    if (it) {
        // do ...
    } else {
        // reach here
    }
});

// or
([3, 2, 3, 44, 23, 423, 4].find(e => e == 44) || false).let(it => {
    if (it) {
        // reach here
    } else {
        // else do ...
    }
})


// demo reduce declaration
// ******************************************************************************************
class TrashCan {
    recycle() {}
    pick() {}
    clear() {}
}

class Player {
    stop() {
        console.log('stop')
    }

    play(position) {
        console.log('play at ', position)
    }
}


// before
var player = new Player;
player.play(5)
player.stop()
var trashCan = new TrashCan;
trashCan.recycle(player);
trashCan.pick(player);
player.stop()
trashCan.clear()

// after
// var free, isolated scope
new Player().let(player => {
    player.play(888)
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
    player.play(777)
    player.stop()
    let trashCan = new TrashCan().applyy(_ => {
        _.recycle(player)
        _.pick(player)
    })
    player.stop()
    trashCan.clear()
});


// demo return this
// ***************************************************
// before
var player = new Player;
player.play(6)
player.stop()
var trashCan = new TrashCan;
trashCan.recycle(player);
trashCan.pick(player);
player.stop()
trashCan.clear()

// after
// return _ in applyy()
// _ or player or whatever you want to naming

// player is the instance of Player
var player = new Player().applyy(_ => {
    _.play(8)
    _.stop()
    // no need call return
})

var trashCan = new TrashCan().applyy(_ => {
    _.recycle(player);
    _.pick(player);
});
player.stop()
trashCan.clear()



// demo return in let
// ***************************************************

// before
var positionInSec = ([3, 2, 3, 44, 23, 423, 4].find(e => e == 44) || 0) * 88
var player = new Player()
player.play(positionInSec);
player.stop();

// after
// var free, chain
([3, 2, 3, 44, 23, 423, 4].find(e => e == 44) || 0).let(it => it * 88)
    .let(it =>
        // it = 44 * 88
        new Player().applyy(_ => {
            _.play(it)
            _.stop()
        })
    );

// or
// return mix let and applyy
var player = ([3, 2, 3, 44, 23, 423, 4].find(e => e == 44) || 0)
    .let(it => it * 88)
    .let(it => new Player().applyy(_ => {
        _.play(it)
    }));

player.stop();

// but no need to do this,
// we will do them all in the scope function
([3, 2, 3, 44, 23, 423, 4].find(e => e == 44) || 0) * 88
    .let(it => new Player().applyy(_ => {
        _.play(it)
        _.stop()
    }));




// demo chain

// *************************************************************************
// after
[{
    id: 'foo1',
    value: 10
}, {
    id: 'foo2',
    value: 20
}].let(it => {

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

        // this is window in arrow fn
        console.log(this)

        // console.log('play')
        _.play(999)
    })

// before
// ************************************************
var a = [{
        id: 'foo1',
        value: 10
    },
    {
        id: 'foo2',
        value: 20
    }
]

console.log(a[1].value * 2)

var b = a.map((v, i) => i * 10)
console.log(b)
var c = 3
console.log(c)
var d = c.toFixed()
var e = new Player
// console.log('play')
e.play(d)


// https://kotlinlang.org/docs/reference/scope-functions.html
// ****************************************************************************************
// Here is a short guide for choosing scope functions depending on the intended purpose:

// Executing a lambda on non-null objects: let
// Introducing an expression as a variable in local scope: let
// Object configuration: apply(applyy here)