class Test extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y){
        super(scene, x, y, 'laser')
    }


    update(){

    }

    fire(x, y){
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        //this.ySpeed = -10;

        this.setVelocityY(-400)

        
    }
}