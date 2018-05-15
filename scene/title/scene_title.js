class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }

    setup(){
        var s = this
        s.bg = GuaImage.new(s.game, 'background')
        s.title = GuaImage.new(s.game, 'title')
        s.title.x = 10
        s.title.y = 80
        s.loading = Loading.new(s.game)
        s.loading.x = 150
        s.loading.y = 220
        s.start = GuaImage.new(s.game, 'start')
        s.start.x = 150
        s.start.y = 420

        s.addElement(s.bg)
        s.addElement(s.title)
        s.addElement(s.start)
        s.addElement(s.loading)
    }

    setupInputs(){
        var s = this
        s.game.registerAction('p', function(){
            var scene = ScenePlay.new(s.game, 1)
            s.game.replaceScene(scene)
        })
    }
}
