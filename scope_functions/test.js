require('./scope_functions')
var classes = require('./classes')
var Player = classes.Player
var TrashCan = classes.TrashCan

'use strict';
//***********************test start***************************** */

// with scope functions
[{
    id: 'foo1',
    value: 10
}, {
    id: 'foo2',
    value: 20
}].let(it => {

        console.log('it[1].value * 2', it[1].value * 2)
        return it.map((v, i) => i * 10)

    }).let(it => {

        // [0, 10]
        console.log('[0, 10]', it)
        return 3
    }).applyy(function (_) {

        // Number(3)
        console.log('Number(3)', this)

    }).let(it => {

        // Number(3)
        console.log('Number(3)', it)

        // "3"
        return it.toFixed()
    }).let(_ => new Player)
    .applyy(f => {

        // "this" is window in arrow fn
        console.log('this is window in arrow fn', this)

        // console.log('play')
        f.play(999)
    });

    [{
        id: 'foo1',
        value: 10
    }, {
        id: 'foo2',
        value: 20
    }].applyy(it => console.log('it[1].value * 2', it[1].value * 2))
        .let(it => it.map((v, i) => i * 10))
        .applyy(console.log)
        .let(() => 3)
        .applyy(console.log)
        .let(it => it.toFixed())
        .let(_ => new Player().applyy(f => f.play(_)))