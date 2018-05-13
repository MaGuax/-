class Enemy extends GuaAnimation{
    constructor(game, name, animations) {
        super(game, name, animations)
        this.setup()
    }

    setup() {
        this.animationName = 'idle'
        this.speed = 5
        // this.speed = randomBtween(2, 5)
        this.x = randomBtween(0, 350)
        this.y = -randomBtween(0, 200)
        this.coolDown = 0
        this.endTime = this.animations['boom']['frameCount']
    }

    update() {
        super.update()
        var p = this
        var s = this
        s.y += s.speed
        if (s.y > 600) {
            s.setup()
        }

        if (s.y + s.h > s.h / 4) {
            s.fire()
        }

        if (s.coolDown > 0) {
            s.coolDown--
        }

        if (p.lifes == 0) {
            p.animationName = 'boom'
            p.paused = true
        }

        if (p.animationName == 'boom') {
            if ((p.frameIndex + 1) == p.animations['boom']['number'] ) {
                p.endTime -= 1
            }
        }

        if (p.endTime == 0) {
            p.alive = false
        }
    }


    fire() {
        if (this.coolDown == 0) {
            this.coolDown = 50
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = Bullet.new(this.game, 'bullet2')
            b.x = x
            b.y = y
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
    }
}


const Enemys = {
    1: Enemy1,
    2: Enemy2,
    3: Enemy3
}
