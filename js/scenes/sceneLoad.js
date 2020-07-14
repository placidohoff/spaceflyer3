let bar;
class SceneLoad extends Phaser.Scene{
    constructor(){
        super('SceneLoad');
    }
    preload(){
        //Placed the bar creation in the preload because error on line11 said I was using it before defined
        this.bar = new Bar({scene:this, x:240,y:320})
        this.bar.setPercent(.5);

        this.load.on('progress', this.onProgress, this);
        this.load.image("title", "assets/title.png");
        this.load.image("button1", "assets/ui/ui/buttons/2/1.png");
        this.load.image("button1", "assets/ui/ui/buttons/2/1.png");
        this.load.image("button2", "assets/ui/ui/buttons/2/4.png");
        //alert("hello")
        this.load.audio('cat', ["audio/meow.mp3", "audo/meow.ogg"]);
        this.load.audio('backgroundMusic', ["audio/background.mp3", "audio/background.ogg"])

        this.load.image("musicOff", "assets/buttons/toggles/icons/music_off.png");
        this.load.image("musicOn", "assets/buttons/toggles/icons/music_on.png");
        this.load.image("sfxOff", "assets/buttons/toggles/icons/sfx_off.png");
        this.load.image("sfxOn", "assets/buttons/toggles/icons/sfx_on.png");
        
        this.load.image("toggleBack", "assets/buttons/toggles/toggles/1.png");
        this.load.image("toggle2", "assets/buttons/toggles/toggles/2.png");
        this.load.image("toggle3", "assets/buttons/toggles/toggles/3.png");
        this.load.image("toggle4", "assets/buttons/toggles/toggles/4.png");
        this.load.image("toggle5", "assets/buttons/toggles/toggles/5.png");
        this.load.image("toggle6", "assets/buttons/toggles/toggles/6.png");
        //bar;
        // alert('hello');
    }
    create(){
        this.bar = new Bar({scene:this, x:240,y:320})
        this.bar.setPercent(.5);
        //this.scene.start('SceneMain');


    }
    update(){

    }
    onProgress(value){
        console.log(value)
        this.bar.setPercent(value)
        value = Math.floor(value * 100);
        //this.progText.setText(value + "%");
    }

    startGame(){

    }
}