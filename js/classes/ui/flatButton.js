class FlatButton extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        if(!config.scene){
            console.log("missing scene!");
            return;
        }
        if(!config.key){
            console.log("missing key.");
            return;
        }
        super(config.scene);

        this.x = this.y = 0;
        if(config.x){
            this.x = config.x;
        }
        if(config.y){
            this.y = config.y;
        }
        this.config = config;

        this.scene = config.scene;
        this.back = this.scene.add.image(this.x,this.y,config.key);
        this.add(this.back)

        
        if(config.text){
            if(config.textConfig){
                this.text1 = this.scene.add.text(0,0,config.text, config.textConfig);
            }
            else{
                this.text1 = this.scene.add.text(0,0,config.text);
            }
            
            this.text1.setOrigin(0.5, 0.5);
            this.add(this.text1)
        }
        

        this.scene.add.existing(this);

        if(config.event){
            this.back.setInteractive();
            this.back.on('pointerdown', this.pressed, this)
        }
        //If is not on mobile, allow for roll over event for cursor roll over button:
        if(model.isMobile == -1){
            // this.back.on("pointerover", this.over, this);
            // this.back.on("pointerout,", this.out, this)
            //functionality not working properly
        }
    }
    over()
    {
        this.y -= 5;
        //this.y += 5;
    }
    out()
    {
        this.y += 5;
    }
    pressed()
    {
        if(this.config.params){
            emitter.emit(this.config.event, this.config.params)
        }
        else{
            emitter.emit(this.config.event)
        }
        
    }
}