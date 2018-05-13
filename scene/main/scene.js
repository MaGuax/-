class ScenePlay extends GuaScene {
    constructor(game, level) {
        super(game)

        this.setup()
        this.setupInputs()
    }

    static new(game, level) {
        var i = new this(game, level)
        return i
    }
    setup(){
        var s = this
        s.bg = GuaImage.new(s.game, 'background')
        s.enemysBullet = []
        s.playerBullet = []
        s.numberOfEnemys = 1
        s.player = Player.new(s.game)

        s.addElement(s.bg)
        s.addElement(s.player)
        s.addEnemys()
    }

    addEnemys() {
        var s = this
        var es = []
        var list = s.numberOfEnemys
        for (var i = 0; i < list; i++) {
            var type = randomBtween(1, 3)
            var e = Enemys[type].new(s.game)
            es.push(e)
            s.addElement(e)
        }
        this.enemys = es
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

        s.playerBullet = s.playerBullet.filter(ele => ele.alive)
        s.enemysBullet = s.enemysBullet.filter(ele => ele.alive)
        s.enemys = s.enemys.filter(ele => ele.alive)

        for (var e of this.enemys) {
            if (s.player.lifes > 0 && rectIntersects(s.player, e)) {
                s.player.lifes--;
                e.lifes--;
            }
        }

        for (var eb of s.enemysBullet) {
            if (s.player.lifes > 0 && rectIntersects(s.player, eb)) {
                s.player.lifes--;
                eb.lifes--;
            }
        }

        for (var pb of s.playerBullet) {
            for (var e of s.enemys) {
                if (rectIntersects(pb, e)) {
                    e.lifes--;
                    pb.lifes--;
                }
            }

            for (var eb of s.enemysBullet) {
                if (rectIntersects(eb, pb)) {
                    pb.lifes--;
                    eb.lifes--;
                }
            }
        }
    }
}
