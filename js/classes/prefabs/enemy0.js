class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        
        config.scene.add.existing(this);
        
    }
    destroyEnemy(){
        this.destroy();
    }
    update(){
        this.x += this.velocity;
        if(this.x >= this.screenWidth || this.x <= -this.originalX){
            this.velocity *= -1;
        }
    }
}