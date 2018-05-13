class GuaGame {
    constructor(fps, images, runCallback) {
        this.__init(fps, images, runCallback)
        this.__loads()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    __init(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        var self = this
        window.addEventListener('keydown', function(event){
            self.keydowns[event.key] = true
        })

        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
    }

    __loads() {
        var g = this
        var loads = []
        for (let i in g.images) {
            var path = g.images[i]
            let img = new Image()
            img.src = path
            img.onload = function() {
                g.images[i] = img
                // 所有图片都载入成功,调用 run
                loads.push(1)
                if (loads.length == Object.keys(g.images).length) {
                    g.run()
                }
            }
        }
    }

    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }

    update() {
        this.scene.update()
    }
    draw(){
        this.scene.draw()
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runLoop() {
        var g = this
        for (var key in g.actions) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }

        g.update()

        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

        g.draw()

        setTimeout(function(){
            g.runLoop()
        }, 1000/window.fps)
    }

    textureByName(name) {
        var g = this
        var img = g.images[name]
        return img
    }

    replaceScene(scene) {
        this.scene = scene
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        setTimeout(function(){
            g.runLoop()
        }, 1000/window.fps)
    }

    run() {
        var g = this
        g.runCallback(g)
    }
}
