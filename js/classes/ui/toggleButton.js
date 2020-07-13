class ToggleButton extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene);
        this.scene = config.scene;

        this.back = this.scene.add.image(0,0, config.backKey);
        this.onIcon = this.scene.add.image(0,0, config.onIcon);
        this.offIcon = this.scene.add.image(0,0, config.offIcon);
    
        //Scale container to be 10% of the game's width:
        Align.scaleToGameW(this.back, .1)
        Align.scaleToGameW(this.onIcon, .05)
        Align.scaleToGameW(this.offIcon, .05)
        
        //Add images to the container:
        this.add(this.back);
        this.add(this.onIcon);
        this.add(this.offIcon);

        //If no value was passed in, set it to true
        if(!config.value)
        {
            config.value = true
        }

        this.value = config.value;

        if(config.event){
            this.event = event;
        }

        this.setIcons();

        this.back.setInteractive();
        this.back.on('pointerdown', this.toggle, this)

        if(config.x){
            this.x = config.x;
        }
        if(config.y){
            this.y = config.y
        }

        //Containers do not have size until we set it
        this.setSize(this.back.displayWidth, this.back.displayHeight);
        
        this.scene.add.existing(this);
    }
    toggle(){
        this.value = !this.value;
        this.setIcons();
        if(this.event){
            emitter.emit(this.event, this.value)
        }
    }

    setIcons(){
        if(this.value == true)
        {
            this.onIcon.visible = false;
            this.offIcon.visible = true;
        }else{
            this.onIcon.visible = true;
            this.offIcon.visible = false;
        }
    }

}