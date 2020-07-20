class Laser extends Phaser.GameObjects.Container{
    constructor(config){
         super(config.scene);
         this.scene = config.scene;
         this.originalX = config.x;
         //this.originY = config.y;
         //Add to the scene:
         this.image = this.scene.add.image(config.x, config.y, "laser")
         //add to the container:
         this.add(this.image);
         //Add the container to the scene:
         this.scene.add.existing(this)
         this.velocity = 8;
         this.trueZero = -200;
         this.isDone = false;

         //this.screenWidth = config.screenWidth;
         //this.screenHeight = config.screenHeight;
    
    }
    update(){
        //this.y -= 2
        
    }
}