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
        //
        s.score = 0
        s.bg = GuaImage.new(s.game, 'background')
        s.upLine = 0
        s.downLine = 600

        //
        s.enemys = []
        s.enemysBullet = []
        s.player = Player.new(s.game)
        s.playerBullet = []
        s.numberOfEnemys = 1

        s.addElement(s.bg)
        s.addElement(s.player)
        s.addEnemys()
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
    }

    addScore(n){
        this.score += n
    }

    getAliveEle(){
        var s = this
        s.playerBullet = s.playerBullet.filter(ele => ele.alive)
        s.enemysBullet = s.enemysBullet.filter(ele => ele.alive)
        s.enemys = s.enemys.filter(ele => ele.alive)
    }

    boomRequired(){
        var s = this
        if (s.player.lifes > 0) {
            for (var e of this.enemys) {
                if (rectIntersects(s.player, e)) {
                    s.player.lifes--;
                    e.lifes--;
                }
            }

            for (var eb of s.enemysBullet) {
                if (eb.particleName != 'particle' && rectIntersects(s.player, eb)) {
                    s.player.lifes--;
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
