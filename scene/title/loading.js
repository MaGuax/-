class Loading extends GuaAnimation{
    constructor(game) {
        var animations = {
            'idle': {
                number: 4,
                frameCount: 16,
                frames: []
            }
        }
        super(game, 'loading', animations)
    }
}
