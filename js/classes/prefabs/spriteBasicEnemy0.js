class spriteEnemy0 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        // ...
        this.scene = scene;

        this.uid = Phaser.Math.Between(0, 20000)
        //scene.add.existing(this);
        //this.speed = Phaser.Math.Between(-5, 5);
        
        this.speed = {
            x: Phaser.Math.Between(-5, 5),
            y: Phaser.Math.Between(-5, 5),
        }

        this.isHit = false;
        
        
        this.player = this.scene.player;

        this.randomOriginNum = Phaser.Math.Between(0, 5)

        if(this.randomOriginNum == 0){
            this.origin = "directAbove";
        }else if(this.randomOriginNum == 1){
                this.origin = "topLeft";
        }
        else if(this.randomOriginNum == 2){
                this.origin = "left";
        }
        else if(this.randomOriginNum == 3){
                this.origin = "right";
        }
        else if(this.randomOriginNum == 4){
                this.origin = "topRight";
        }

        // this.origin = "directAbove"
        // this.x = 0;
        // this.y = 0;
        // this.speed.x = 0;
        // this.speed.y = 0;

       if(this.origin == "directAbove"){
           this.x = this.player.x;
           this.y = -50;
           this.speed.x = 0;
           this.speed.y = 5;
           this.direction = "down"
       }else if(this.origin == "topLeft"){
           this.x = this.player.x - 1500;
           this.y = this.player.y -1500;
           this.speed.x = 5;
           this.speed.y = 5;
           this.direction = "downRight"
       }else if(this.origin == "left"){
            this.x = this.player.x - 1500;
            this.y = this.player.y;
            this.speed.x = 5;
            this.speed.y = 0;
            this.direction = "right"
        }else if(this.origin == "right"){
            this.x = this.player.x + 1500;
            this.y = this.player.y;
            this.speed.x = -5;
            this.speed.y = 0;
            this.direction = "left"
        }else if(this.origin == "topRight"){
            this.x = this.player.x + 1500;
            this.y = this.player.y - 1500;
            this.speed.x = -5;
            this.speed.y = 5;
            this.direction = "downLeft"
        }

        scene.add.existing(this);
        console.log(this.x);
        console.log(this.y)
        //this.isHit = true;
        
    }
    update(){
        
            this.x += this.speed.x;
            this.y += this.speed.y;
        

        //console.log(this.x, ' ', this.y);

        

        if(this.direction == 'down' || this.direction == 'downRight' || this.direction == "downLeft"){
            if(this.y > game.config.height + 100){
                console.log('destroy');
                //this.destroy();
                this.isOffSreen = true;
            }
        }
        if(this.direction == "right"){
            if(this.x > game.config.width + 100){
                console.log('destroy');
                //this.destroy();
                this.isOffSreen = true;
            }
        }
        if(this.direction == "left"){
            if(this.x < -100){
                console.log('destroy');
                //this.destroy();
                this.isOffSreen = true;
            }
        }
        //console.log(this.y)

        // if(this.x > game.config.width)
        //     this.speed.x *= -1;
        // if(this.x < 0)
        //     this.speed.x *= -1;
        // if(this.y > game.config.height){
        //     this.speed.y *= -1;
        // }
        // if(this.y < 0){
        //     this.speed.y *= -1;
        // }

        // if(this.isHit){
        //     this.body.setVelocity(0,0)
        // }
        
    }
    // ...

    // preUpdate(time, delta) {
    //     super.preUpdate(time, delta);
    // }
    killThis(){
        this.loadTexture('explosion_atlas');
    }

    get(key){
        if(key == 'speed'){
            let val = this.speed
            return val;
        }
        if(key == 'origin'){
            let val = this.origin;
            return val;
        }
        if(key == 'x'){
            let val = this.x;
            return val;
        }
        if(key == 'y'){
            let val = this.y
            return val;
        }
    }
}