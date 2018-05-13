class SceneDone extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('全部关卡已通关, 你真是太厉害啦, 按 r 返回标题界面', 10, 290)
    }
}
