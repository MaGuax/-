class GuaScene {
    constructor(game) {
        this.game = game
        this.game.actions = {}
        this.game.keydowns = {}
        this.elements = []
    }

    addElement(e) {
        e.scene = this
        this.elements.push(e)
    }

    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            // this.game.drawImage(e)
            e.draw()
        }
    }

    update() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }

        this.elements = this.elements.filter(e => e.alive)
    }

    static new(game) {
        var i = new this(game)
        return i
    }
}
