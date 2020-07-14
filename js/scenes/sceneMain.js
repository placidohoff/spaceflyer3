class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain')
    }

    preload(){
                
    }
    create(){
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        // let mediaManager = new MediaManager({scene: this});
        // mediaManager.setBackgroundMusic('backgroundMusic')

        let sb = new SoundButtons({scene: this});
        
    }
    update(){

    }
    buttonPressed(params){
        model._musicOn ? model._musicOn = false : model._musicOn = true
        console.log(model._musicOn)
        emitter.emit(G.MUSIC_CHANGED, this)
        //model._musicOn = !model._musicOn;
        //emitter.emit(G.PLAY_SOUND, 'cat');
        if(params == 'button2'){
            this.scene.start('SceneOver');
        }
    }
}