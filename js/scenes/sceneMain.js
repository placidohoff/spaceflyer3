class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain')
    }

    preload(){
        this.load.image("button1", "assets/ui/ui/buttons/2/1.png");
        this.load.image("button2", "assets/ui/ui/buttons/2/4.png");
        //alert("hello")
        this.load.audio('cat', ["audio/meow.mp3", "audo/meow.ogg"]);
        this.load.audio('backgroundMusic', ["audio/background.mp3", "audio/background.ogg"])

        this.load.image("music_off", "assets/buttons/toggles/icons/music_off.png");
        this.load.image("music_on", "assets/buttons/toggles/icons/music_on.png");
        this.load.image("sfxOff", "assets/buttons/toggles/icons/sfx_off.png");
        this.load.image("sfxOn", "assets/buttons/toggles/icons/sfx_on.png");
        
        this.load.image("toggleBack", "assets/buttons/toggles/toggles/1.png");
        this.load.image("toggle2", "assets/buttons/toggles/toggles/2.png");
        this.load.image("toggle3", "assets/buttons/toggles/toggles/3.png");
        this.load.image("toggle4", "assets/buttons/toggles/toggles/4.png");
        this.load.image("toggle5", "assets/buttons/toggles/toggles/5.png");
        this.load.image("toggle6", "assets/buttons/toggles/toggles/6.png");
        
    }
    create(){
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        let mediaManager = new MediaManager({scene: this});
        mediaManager.setBackgroundMusic('backgroundMusic')

        let button1Text = {color: 'black', fontSize: 20}
        let flatButton = new FlatButton({scene: this, key: 'button1', text:'Click Me',  event:'button_pressed', params:'button1', textConfig: button1Text})
        let flatButton2 = new FlatButton({scene: this, key: 'button2', text:'Click Me',  event:'button_pressed', params: 'button2'})

        let toggleButton = new ToggleButton({scene:this, backKey:'toggleBack', onIcon:'sfxOn', offIcon:'sfxOff', event:"TOGGLE_SOUND", x:240, y:450})

        emitter.on('button_pressed', this.buttonPressed, this)
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