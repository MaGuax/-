class Player extends GuaAnimation{
    constructor(game) {
        var animations = {
            'idle': {
                number: 2,
                frameCount: 3,
                frames: []
            },
            'boom': {
                number: 4,
                frameCount: 12,
                frames: []
            }
        }
        super(game, 'player', animations)
        this.setup()
    }

    setup() {
        this.speed = config.player_speed
        this.paused = false
        this.x = 150
        this.y = 450
        this.coolDown = 0
        this.bulletConfig = {
            name: 'bullet1',
            speed: 10,
            // x: this.x + this.w / 2,
            // y: this.y + this.h
        }
        this.endTime = this.animations['boom']['frameCount']

        //
        this.lifes = 6
    }

    update() {
        super.update()
        var p = this
        p.speed = config.player_speed
        if (p.coolDown > 0) {
            p.coolDown--
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
            this.coolDown = 10
            this.bulletConfig.x = this.x + this.w / 2
            this.bulletConfig.y = this.y
            var b = Bullet.new(this.game, this.bulletConfig)
            this.scene.addElement(b)
            this.scene.playerBullet.push(b)
        }
    }

    moveLeft() {
        if (this.paused) {
            return
        }
        this.x -= this.speed
    }
    moveRight() {
        if (this.paused) {
            return
        }
        this.x += this.speed
    }
    moveUp() {
        if (this.paused) {
            return
        }
        this.y -= this.speed
    }
    moveDown() {
        if (this.paused) {
            return
        }
        this.y += this.speed
    }
}
