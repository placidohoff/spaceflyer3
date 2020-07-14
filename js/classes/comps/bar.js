class Bar extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene);
        this.scene = config.scene;

        if(!config.color){
            config.color = 0xff0000;
        }
        if(!config.width){
            config.width = 200
        }

        if(!config.height){
            config.height = config.width /4;
        }

        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(config.color, 1);
        this.graphics.fillRect(0,0,config.width,config.height)

        //Add graohics to the container:
        this.add(this.graphics);
        this.graphics.x = -config.width/2;
        this.graphics.y = -config.height/2;

        //if we pass in x,y for Bar:
        if(config.x){
            this.x = config.x;
        }
        if(config.y){
            this.y = config.y;
        }

        //Add the bar to the parent scene:
        this.scene.add.existing(this);
    }

    setPercent(per){
        this.graphics.scaleX = per;
    }
}