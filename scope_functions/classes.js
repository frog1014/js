class TrashCan {
    recycle() {}
    pick() {}
    clear() {}
}

class Player {
    constructor() {
        this.isStopped = false
    }

    stop() {
        this.isStopped = true
        console.log('stop')
    }

    play(position) {
        console.log('play at ', position)
    }
}

module.exports.Player = Player
module.exports.TrashCan = TrashCan