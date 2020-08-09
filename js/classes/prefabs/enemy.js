class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(config){
        super(config);

        
    }
    destroyEnemy(){
        this.destroy();
    }
}