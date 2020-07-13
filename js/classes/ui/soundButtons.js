class SoundButtons extends Phaser.GameObjects.Container{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;

        this.musicButton = new ToggleButton({scene:this.scene, backKey:'toggleBack', onIcon:'musicOn', offIcon:'musicOff', event:"TOGGLE_MUSIC"})
        this.sfxButton = new ToggleButton({scene:this.scene, backKey:'toggleBack', onIcon:'sfxOn', offIcon:'sfxOff', event:"TOGGLE_SOUND", x:240, y:450})

        this.add(this.musicButton);
        this.add(this.sfxButton);

        //Manual set origin to 0.5
        this.musicButton.y = (this.musicButton.height /2) + 100;
        this.musicButton.x = this.musicButton.width /2;

        this.sfxButton.x = game.config.width - this.sfxButton.width /2;
        this.sfxButton.y = this.musicButton.y;

        this.sfxButton.setScrollFactor(0);
        this.musicButton.setScrollFactor(0);

        //If music/sound is already off in Model, this will reflect that"
        if(model.musicOn == false){
            this.musicButton.toggle();
        }
        if(model.soundOn == false){
            this.sfxButton.toggle();
        }
        
        this.scene.add.existing(this)
    }
}