class Laser extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)


        //Sscene.physics.add.sprite(400, 400, 'laser')
        this.image = scene.add.image(x, y, "laser")
        //this.add(this.image)
        // scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        //this.ySpeed = -10;

        //this.setVelocityY(-400)
        this.setVelocity(0, -400);

        this.setScale(2);
        this.setBounce(1, 1);
        this.setCollideWorldBounds(true);
    }

    fire(x, y){
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        //this.ySpeed = -10;

        this.setVelocityY(-400)

        
    }

    // preUpdate(time, delta){
    //     super.preUpdate(time, delta);

    //     if(this.y <= -5){
    //         this.setActive(false)
    //         this.setVisible(false)
    //     }
    // }

    update(){
        //this.y -
        this.y -= 20;
        //alert('yo')
        if(this.y <= -2)
            this.setActive(false)
    }
}

