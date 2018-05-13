class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        var plan = GuaAnimation.new(game)
        plan.x = 100
        plan.y = 300
        this.addElement(plan)

        this.setupInputs()
    }

    setupInputs() {
        var s = this
        s.game.registerAction('r', function(){
            var nextS = SceneTitle.new(s.game)
            s.game.replaceScene(nextS)
        })
    }

    // draw() {
    //     this.game.context.fillText('游戏结束, 按 r 返回标题界面', 10, 290)
    // }
}
