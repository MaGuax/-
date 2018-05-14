// class Bullet extends GuaImage{
//     constructor(game, type) {
//         var name = 'bullet' + type
//         super(game, name)
//
//         this.type = type
//         this.setup()
//     }
//
//     setup() {
//         this.speedTypes = {
//             '1': 3,
//             '2': -3
//         }
//         this.speed = this.speedTypes[this.type]
//
//         this.lifes = 1
//     }
//
//     update() {
//         this.y -= this.speed
//
//         if (this.y > 600) {
//             this.lifes--
//         }
//
//         // if (rectIntersects(this)) {
//         //
//         // }
//     }
// }

class Bullet extends GuaParticleSystem {
    constructor(game, config) {
        var particle = {
            'all': {
                number: 1,
                particleList: [],
                vx: 0,
                vy: 0,
            },
            'particle': {
                number: 10,
                particleList: [],
                vx: randomBtween(-10, 10),
                vy: randomBtween(-10, 10)
            }
        }
        super(game, config.name, particle)

        this.setup(config)
    }

    setup(config) {
        this.speed = config['speed']
        this.x = config['x']
        this.y = config['y']
        this.lifes = 1

    }

    update() {
        super.update()
        this.y -= this.speed
        //

        this.moveStart()

        this.deadLineRequired()
    }

    deadLineRequired(){
        if (this.lifes < -5 || this.scene.upLine > this.y || this.y > this.scene.downLine) {
            this.alive = false
        }
    }

    moveStart(){
        if (this.lifes == 0) {
            this.particleName = 'particle'
        }
    }

}
