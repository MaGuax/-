class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        game.registerAction('k', function(){
            var s = ScenePlay.new(game, 1)
            game.replaceScene(s)
        })
        game.registerAction('e', function(){
            var s = SceneEdit.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('k 开始游戏', 100, 100)
        this.game.context.fillText('e 自定义游戏关卡', 100, 200)
    }
}
