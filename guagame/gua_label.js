class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    static new(game, text) {
        var s = new this(game, text)
        return s
    }

    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }

    update() {

    }
}
