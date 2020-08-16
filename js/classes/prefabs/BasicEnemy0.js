class BasicEnemy0 extends Phaser.GameObjects.Container{
    constructor(config){
         super(config.scene);
         this.scene = config.scene;
         this.originalX = config.x;
         //this.originY = config.y;
         //Add to the scene:
         this.image = this.scene.add.image(config.x, config.y, "basicEnemy0")
         //add to the container:
         this.add(this.image);
         //Add the container to the scene:
         this.scene.add.existing(this)
         this.velocity = 8;

         this.screenWidth = config.screenWidth;
         this.screenHeight = config.screenHeight;
    
          
    }
    update(){
        this.x += this.velocity;
        if(this.x >= this.screenWidth || this.x <= -this.originalX){
            this.velocity *= -1;
        }
    }

    killThis(){
        this.loadTexture('explosion_atlas');
    }
}