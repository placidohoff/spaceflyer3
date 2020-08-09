class spriteEnemy0 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        // ...
        this.scene = scene;
        scene.add.existing(this);
        //this.speed = Phaser.Math.Between(-5, 5);
        
        this.speed = {
            x: Phaser.Math.Between(-5, 5),
            y: Phaser.Math.Between(-5, 5),
        }
    }
    update(){
        this.x += this.speed.x;
        this.y += this.speed.y;

        if(this.x > game.config.width)
            this.speed.x *= -1;
        if(this.x < 0)
            this.speed.x *= -1;
        if(this.y > game.config.height){
            this.speed.y *= -1;
        }
        if(this.y < 0){
            this.speed.y *= -1;
        }
        
    }
    // ...

    // preUpdate(time, delta) {
    //     super.preUpdate(time, delta);
    // }
}