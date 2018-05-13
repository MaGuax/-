var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false

    // window.addEventListener('keydown', function(event){
    //     var k = event.key
    //     if (k == 'p') {
    //         paused = !paused
    //     }
    // })

    //
    document.querySelector('#id-input-speed').addEventListener('change', function(e) {
        var input = e.target
        var fps = Number(input.value)
        window.fps = fps
    })
}

var __main = function() {

    var game = GuaGame.instance(30, imgConfig, function(g){
        var s = ScenePlay.new(g)
        // var s = SceneTitle.new(g)
        // var s = SceneEnd.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)


}

__main()
