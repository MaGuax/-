class Enemy extends GuaAnimation{
    constructor(game, name, animations) {
        super(game, name, animations)
        this.setup()
    }

    setup() {
        this.animationName = 'idle'
        this.speed = randomBtween(3, 5)
        this.score = 0
        this.x = randomBtween(25, 400)
        this.y = -randomBtween(0, 200)
        this.coolDown = 0
        this.endTime = this.animations['boom']['frameCount']
        this.bulletConfig = {
            name: 'bullet2',
            speed: -3
        }
    }

    update() {
        super.update()
        var s = this
        s.y += s.speed
        if (s.y > 850 + s.h) {
            s.setup()
        }

        if (s.y + s.h > s.h / 4) {
            s.fire()
        }

        if (s.coolDown > 0) {
            s.coolDown--
        }

        if (s.lifes == 0) {
            s.animationName = 'boom'
            s.paused = true
        }

        if (s.animationName == 'boom') {
            if ((s.frameIndex + 1) == s.animations['boom']['number'] ) {
                s.endTime -= 1
            }
        }

        if (s.endTime == 0) {
            s.alive = false
            s.scene.addScore(s.score)
        }
    }


    fire() {
        if (this.coolDown == 0) {
            this.coolDown = 90
            this.bulletConfig.x = this.x + this.w / 2
            this.bulletConfig.y = this.y + this.h
            var b = Bullet.new(this.game, this.bulletConfig)
            b.speed = -(this.speed * 2)
            this.scene.addElement(b)
            this.scene.enemysBullet.push(b)
        }
    }
}

class Enemy1 extends Enemy{
    constructor(game) {
        var name = 'enemy1'
        var animations = {
            'idle': {
                number: 1,
                frameCount: 3,
                frames: []
            },
            'boom': {
                number: 4,
                frameCount: 8,
                frames: []
            }
        }
        super(game, name, animations)
    }

    setup(){
        super.setup()
        this.score = 100
        this.bulletConfig = {
            name: 'bullet2',
            speed: -1
        }
    }
}

class Enemy2 extends Enemy{
    constructor(game) {
        var name = 'enemy2'
        var animations = {
            'idle': {
                number: 1,
                frameCount: 3,
                frames: []
            },
            'boom': {
                number: 4,
                frameCount: 12,
                frames: []
            },
            'hit': {
                number: 1,
                frameCount: 3,
                frames: []
            }
        }
        super(game, name, animations)
    }

    setup(){
        super.setup()
        this.lifes = 4
        this.score = 200
        this.bulletConfig = {
            name: 'bullet2',
            speed: -3
        }
    }
}

class Enemy3 extends Enemy{
    constructor(game) {
        var name = 'enemy3'
        var animations = {
            'idle': {
                number: 1,
                frameCount: 3,
                frames: []
            },
            'boom': {
                number: 4,
                frameCount: 15,
                frames: []
            },
            'hit': {
                number: 1,
                frameCount: 3,
                frames: []
            }
        }
        super(game, name, animations)
    }

    setup(){
        super.setup()
        this.lifes = 6
        this.score = 300
        this.bulletConfig = {
            name: 'bullet2',
            speed: -3
        }
    }
}


const Enemys = {
    1: Enemy1,
    2: Enemy2,
    3: Enemy3
}
