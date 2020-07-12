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

        if(config.x){
            this.x = config.x;
        }
        if(config.y){
            this.y = config.y;
        }
        this.config = config;

        this.scene = config.scene;
        this.back = this.scene.add.image(this.x,this.y,config.key);

        
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