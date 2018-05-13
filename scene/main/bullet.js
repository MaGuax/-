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
    constructor(game, name) {
        var particle = {
            'all': {
                number: 1,
                particleList: [],
                vx: 0,
                vy: 0,
                speed: 3,
            },
            'particle': {
                number: 10,
                particleList: [],
                vx: randomBtween(-10, 10),
                vy: randomBtween(-10, 10),
                speed: 3,
            }
        }
        super(game, name, particle)

        this.setup(name)
    }

    setup(name) {
        this.speedTypes = {
            'bullet1': 3,
            'bullet2': -3
        }
        this.speed = this.speedTypes[name]
        this.lifes = 1

    }

    update() {
        super.update()
        this.y -= this.speed
        //
        // if (this.y > this.deadLine) {
        //     this.lifes--
        // }
        // this.deadLine()

        //
        if (this.lifes == 0) {
            this.particleName = 'particle'
            // this.alive = false
            this.particles['particle']['particleList']
        }
    }
}
