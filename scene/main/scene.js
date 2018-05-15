class ScenePlay extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup(){
        var s = this
        //
        s.bg = GuaImage.new(s.game, 'background')
        s.title = GuaLabel.new(s.game, '玩家生命: ', 20, 30)
        s.score = GuaLabel.new(s.game, '玩家得分: 0', 20, 60)
        s.game.context.font ="20px Georgia"
        s.upLine = 20
        s.downLine = 850

        //
        s.enemys = []
        s.enemysBullet = []
        s.player = Player.new(s.game)
        s.playerScore = 0
        s.playerLifes = s.player.getHearts(80, 9)
        s.playerBullet = []
        s.numberOfEnemys = 2

        s.addElement(s.bg)
        s.addElement(s.player)
        s.addElement(s.title)
        s.addElement(s.score)
        s.addEnemys()
        s.addElements(s.playerLifes)
    }

    create_enemy(){
        var type = randomBtween(1, 2)
        var e = Enemys[type].new(this.game)
        this.enemys.push(e)
        this.addElement(e)
    }

    addEnemys() {
        var s = this
        var list = s.numberOfEnemys
        for (var i = 0; i < list; i++) {
            s.create_enemy()
        }
    }

    setupInputs() {
        var s = this
        s.game.registerAction('a', function(){
            s.player.moveLeft()
        })

        s.game.registerAction('d', function(){
            s.player.moveRight()
        })

        s.game.registerAction('w', function(){
            s.player.moveUp()
        })

        s.game.registerAction('s', function(){
            s.player.moveDown()
        })

        s.game.registerAction('j', function(){
            s.player.fire()
        })
    }

    update() {
        super.update()
        var s = this

        s.getAliveEle()

        s.boomRequired()

        if (s.enemys.length < s.numberOfEnemys) {
            s.create_enemy()
        }

        s.score.text = `玩家得分：${s.playerScore}`

        if (!s.player.alive) {
            if (!localStorage.hightScore || Number(localStorage.hightScore) < s.playerScore) {
                localStorage.hightScore = s.playerScore
            }
            localStorage.endingScore = s.playerScore
            var scene = SceneEnd.new(s.game)
            s.game.replaceScene(scene)
        }
    }

    addScore(n){
        this.playerScore += n
    }

    getAliveEle(){
        var s = this
        s.playerBullet = s.playerBullet.filter(ele => ele.alive)
        s.enemysBullet = s.enemysBullet.filter(ele => ele.alive)
        s.playerLifes = s.playerLifes.filter(ele => ele.alive)
        s.enemys = s.enemys.filter(ele => ele.alive)
    }

    boomRequired(){
        var s = this
        if (s.player.lifes > 0) {
            for (var e of this.enemys) {
                if (rectIntersects(s.player, e)) {
                    s.player.lifes = 0;
                    for (var h of s.playerLifes) {
                        h.alive = false
                    }
                    e.lifes = 0;
                }
            }

            for (var eb of s.enemysBullet) {
                if (eb.particleName != 'particle' && rectIntersects(s.player, eb)) {
                    s.player.lifes--;
                    var index = s.playerLifes.length - 1
                    s.playerLifes[index].alive = false
                    eb.lifes--;
                }
            }
        }


        for (var pb of s.playerBullet) {
            if (pb.particleName != 'particle') {
                for (var e of s.enemys) {
                    if (rectIntersects(pb, e)) {
                        e.lifes--;
                        pb.lifes--;
                    }
                }

                for (var eb of s.enemysBullet) {
                    if (eb.particleName != 'particle' && rectIntersects(pb, eb)) {
                        pb.lifes--;
                        eb.lifes--;
                    }
                }
            }
        }
    }
}
