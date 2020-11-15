//import Test from './classes/Test.js'

class Laser extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y){
        super(scene, x, y, 'laser')
        //this.body.enable(false)
    }

    fire(x, y){
        this.isLive = true
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
        //this.y += this.ySpeed;
        if(this.y <= -2)
            this.setActive(false)
    }
}

class LaserGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene){
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: Laser,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'laser',
            x: 2600,
            y: 2600
        })
    }

    fireLaser(x, y){
        const laser = this.getFirstDead(false)
        if(laser){
            laser.fire(x, y)
        }
    }
}

class BasicEnemyGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene){
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: BasicEnemy,
            frameQuantity: 30,
            active: false,
            visible: false,
            enable:false,
            key: 'basicEnemy',
            x: -500,
            y: -500
        })
    }

    spawn(x, y){
        const enemy = this.getFirstDead(false)
        if(enemy){
            enemy.init(x, y)
        }
    }

    spawnMultiple(){

    }
}


class BasicEnemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y){
        super(scene, x, y, 'basicEnemy')
        //this.body.enable(false)
    }

    init(x,y){
        
        // this.setActive(true);
        // this.setVisible(true);

        //console.log("spawn")

        this.body.reset(this.x, this.y);

        this.setActive(true);
        this.setVisible(true);
        this.isLive = true

        this.uid = Phaser.Math.Between(0, 20000)

        this.isHit = false;

        this.speed = {x:0, y:0}

        this.score = 1
        

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


        //this.origin = "directAbove"
        if(this.origin == "directAbove"){
            this.x = x;
            this.y = -50;
            this.speed.x = 0;
            this.speed.y = 5;
            this.setVelocityY(100)
            this.direction = "down"
        }else if(this.origin == "topLeft"){
            this.x = x - 1500;
            this.y = y -1500;
            this.speed.x = 5;
            this.speed.y = 5;
            this.direction = "downRight"
        }else if(this.origin == "left"){
             this.x = x - 1500;
             this.y = y;
             this.speed.x = 5;
             this.speed.y = 0;
             this.direction = "right"
         }else if(this.origin == "right"){
             this.x = x + 1500;
             this.y = y;
             this.speed.x = -5;
             this.speed.y = 0;
             this.direction = "left"
         }else if(this.origin == "topRight"){
             this.x = x + 1500;
             this.y = y - 1500;
             this.speed.x = -5;
             this.speed.y = 5;
             this.direction = "downLeft"
         }


        this.body.reset(this.x, this.y);

        this.setActive(true);
        this.setVisible(true);

    }


    update(){
        this.x += this.speed.x
        this.y += this.speed.y;

        if(this.direction == "down"){
            if(this.y > screen.height){
                this.setActive(false)
                this.setVisible(false)
            }
        }
        if(this.direction == "downRight"){
            if(this.y > screen.height){
                this.setActive(false)
                this.setVisible(false)
            }
        }
        if(this.direction == "right"){
            if(this.x > screen.width +10){
                this.setActive(false)
                this.setVisible(false)
            }
        }
        if(this.direction == "upRight"){
            if(this.x > screen.width +10){
                this.setActive(false)
                this.setVisible(false)
            }
        }
        if(this.direction == "up"){
            if(this.y < -10){
                this.setActive(false)
                this.setVisible(false)
            }
        }
        if(this.direction == "upLeft"){
            if(this.y < -10){
                this.setActive(false)
                this.setVisible(false)
            }
        }
        if(this.direction == "left"){
            if(this.x < -10){
                this.setActive(false)
                this.setVisible(false)
            }
        }
        if(this.direction == "downLeft"){
            if(this.x < -10){
                this.setActive(false)
                this.setVisible(false)
            }
        }
    }
}



// this.player;
class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain')
    }

    preload(){
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }
    create(){
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        //addBackground()
        this.starfield = this.add.tileSprite(0, 160, game.width, game.height, 'starfield');
        this.starfield.setTilePosition(0,0)
        this.starfield.setInteractive();
        this.spawnPlayer({x: screen.width/2, y: screen.height - 200})
        //this.starfield.on('pointerdown', this.playerRespawn, this)

        //addPlayer()
        // this.player = this.physics.add.sprite(400, 400, 'ship')
        // this.player.setOrigin(0.5, 0.5);
        // this.player.angle -= 90;
        // this.player.nextFire = 0;
        // this.player.fireRate = 500;
        // Align.scaleToGameW(this.player, .1)
        
        // this.player.score = 0;

        // this.player.weapon = 'basic';
        // this.fireRate = 500;
        // this.ability = 'none';
        // this.player.isDead = false;
        // this.player.isHit = false;
        // this.player.isWaitingToRespawn = false;

        // //////DRAGGABLE LOGIC:
        // this.player.setInteractive();
        // this.input.setDraggable(this.player)
        // this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

        //     gameObject.x = dragX;
        //     gameObject.y = dragY;

        // })


        this.groupPlayerLasers = new LaserGroup(this);
        this.groupBasicEnemies = new BasicEnemyGroup(this)
        
        
        this.enemyLevel = 0;


        this.nextEnemy0 = 50;
        this.lastEnemyTime = 0;
        this.enemyTimeRate = 2000;



        this.physics.add.collider(this.player, this.groupBasicEnemies, this.playerHit);
        this.physics.add.collider(this.groupPlayerLasers, this.groupBasicEnemies, this.enemyHit);



        this.cursors = this.input.keyboard.createCursorKeys();

        emitter.on("Game_Over", this.goGameOver, this);
        emitter.on("Enemy_Hit", this.animateExplosion, this)
        emitter.on("Respawn", this.respawnPlayer, this);
        emitter.on("Handle_Player_Hit", this.handlePlayerHit, this);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('explosion_atlas', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'basicExplosion',
            frames: this.anims.generateFrameNumbers('basicEnemy', { start: 1, end: 9 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'playerExplode',
            frames: this.anims.generateFrameNumbers('playerExplode', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: 0
        })

        this.score = 2;
        this.scoreText = this.add.text(10,10, `score: ${this.score}`)
        this.lives = 3;
        this.playerLives = [];
        for(let i = 0; i < this.lives; i++){
            this.playerLives[i] = this.add.sprite(25 + i*20, this.scoreText.y + this.scoreText.height+10, 'ship')
            // this.playerLives[i].width = 10;
            // this.playerLives[i].height = 10;
            this.playerLives[i].angle -= 90;
            this.playerLives[i].displayWidth *= .8
            this.playerLives[i].scaleY = this.playerLives[i].scaleX;
        }
        this.isGameOver=false
    }
    update(time){
        this.starfield.tilePositionY -= 2;


        this.groupBasicEnemies.children.iterate(function(child){
            if(child.active)
                child.update();
        })

        // this.player.x += this.player.speed.x;
        // this.player.y += this.player.speed.y;
        
        this.checkInput();
        this.updateClocks();
        this.boundsCheck();
        //if(time > this.lastEnemyTime + this.enemyTimeRate)
        this.spawnEnemy(time);
        //this
        this.fireWeapon(time);
        this.checkCollisions();
        
        //console.log(this.scene)
        this.updateLasers();
    }
    spawnPlayer(endPoint){
        if(!endPoint){
            endPoint={x:screen.width/2, y: screen.height-200}
            this.respawnText.text='';
        }
        this.player = this.physics.add.sprite(endPoint.x, screen.height + 50, 'ship')
        this.player.setOrigin(0.5, 0.5);
        this.player.angle -= 90;
        this.player.nextFire = 0;
        this.player.fireRate = 500;
        Align.scaleToGameW(this.player, .1)
        
        this.player.weapon = 'basic';
        this.fireRate = 500;
        this.ability = 'none';
        this.player.isDead = false;
        this.player.isHit = false;
        this.player.isWaitingToRespawn = false;

        //////DRAGGABLE LOGIC:
        this.player.setInteractive();
        this.input.setDraggable(this.player)
        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        })

        this.physics.add.collider(this.player, this.groupBasicEnemies, this.playerHit);

        
        this.tweens.add({
            targets: this.player,
            y: endPoint.y,
            duration: 500,
            ease: 'Linear',
            //completeDelay: 3000
        });

    }
    playerRespawn(){
        //console.log('respawn')
        if(this.player.isWaitingToRespawn){
            //this.physics.moveTo(this.player, this.input.activePointer.downX, this.input.activePointer.downY, this.player.speed.tch)
            console.log(this.input.activePointer.downX)
            console.log("HELLO")
        }else{
            
        }
    }
    handlePlayerHit(){
        this.player.anims.play('playerExplode')
        this.player.isHit = true
        this.player.body.enable = false
        this.player.isWaitingToRespawn = true;


        this.lives--;
        if(this.lives >= 0){
            

            //this.add.tween(this.playerLives).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            this.tweens.add({
                targets: this.playerLives[this.lives],
                alpha: 0,
                duration: 2000,
                ease: 'Linear',
                //completeDelay: 3000
            });
            //this.autoSpawn = this.time.addEvent(5000, this.spawnPlayer({x:screen.width/2, y: 200}), this)
            this.autoSpawn = this.time.delayedCall(5000, this.spawnPlayer, {x:100, y:100}, this)
            this.respawnText = this.add.text(screen.width/2, screen.height/2, "Tap to Respawn", {fontSize: '28px', color: '#DC1'})
            this.respawnText.setOrigin(0.5, 0.5);
            this.respawnPoint;
            //if(this.player.isWaitingToRespawn){
                this.starfield.on('pointerdown', function(pointer){
                    if(this.player.isWaitingToRespawn && !this.isGameOver){
                        // console.log(pointer.x)
                        //this.time.events.remove(this.autoSpawn)
                        this.autoSpawn.remove()
                        this.respawnText.text=''
                        this.respawnPoint = pointer;
                        this.player.isWaitingToRespawn = false
                        this.spawnPlayer(this.respawnPoint)
                    }
                },this)
            //}


            //this.respawnText.fontSize: '20px'
        }else{
            this.isGameOver=true
            this.respawnText.text="Game Over"
        }
    }
    updateLasers(){
        this.groupPlayerLasers.children.each(function(laser){
            laser.update();
        })
    }
    checkInput(){
        if(this.cursors.left.isDown){
            if(this.cursors.up.isDown){
                this.player.speed.x = -3
                this
            }
            else{
                this.player.speed.x = -3;
                this.player.speed.y = 0;
            }
        }
        else if(this.cursors.up.isDown){
            this.player.speed.x = 0;
            this.player.speed.y = -3
        }
        else if(this.cursors.right.isDown){
            this.player.speed.x = 3;
            this.player.speed.y = 0;
        }
        else if(this.cursors.down.isDown){
            this.player.speed.x = 0;
            this.player.speed.y = 3;
        }
    }
    buttonPressed(params){
        model._musicOn ? model._musicOn = false : model._musicOn = true
        console.log(model._musicOn)
        emitter.emit(G.MUSIC_CHANGED, this)
        //model._musicOn = !model._musicOn;
        //emitter.emit(G.PLAY_SOUND, 'cat');
        if(params == 'button2'){
            this.scene.start('SceneOver');
        }
    }
    touch(){
    //     this.player.speed.x = 0;
    //     this.player.speed.y = 0;
    //    //this.move = this.physics.moveTo(this.ship, this.tx, this.ty, 60)
    //     console.log(this.tx = this.starfield.input.localX); 
    //     console.log(this.ty = this.starfield.input.localY);
    //     //console.log(this.input.activePointer)
    //     this.physics.moveTo(this.player, this.input.activePointer.downX, this.input.activePointer.downY, this.player.speed.tch)
    }
    boundsCheck(){
        if(this.player.x <= 0){
            this.player.x += 30;
        }
        else if(this.player.x >= game.config.width){
            this.player.x -= 10;
        }
        else if(this.player.y <= 0){
            this.player.y += 10;
        }
        else if(this.player.y >= game.config.height){
            this.player.y -= 10;
        }

    
    }
    spawnEnemy(time){
        if(time > this.lastEnemyTime + this.enemyTimeRate){
            this.lastEnemyTime = time;


            this.groupBasicEnemies.spawn(this.player.x, this.player.y)

            // this.randomNumber = Phaser.Math.Between(0, 100)

            // if(this.randomNumber < 75){
            //     this.enemy = new spriteEnemy0(this, 0, 0, 'basicEnemy')
            //     this.groupEnemy0.add(this.enemy);
            // }
            // else
            //     this.spawnMultipleEnemies('basicEnemy')
            
            
        }
        /*
        if(this.clocks.enemy0 > this.nextEnemy0){
            //this.lastEnemy = 0;
            //console.log("Hello")
            this.clocks.enemy0 = 0;
            console.log('spawn');

            this.originNum = Phaser.Math.Between(0, 4);
            if(this.originNum == 0){
                this.direction = "Go Right"
                this.originX = this.player.x - 400;
                this.originY = this.player.y;
                this.speedX = Phaser.Math.Between(1, 5)
                this.speedY = 0;
            }else if(this.originNum == 1){
                this.direction = "Go DownRight"
                this.originX = this.player.x - 400;
                this.originY = this.player.y - 400;
                this.speedX = Phaser.Math.Between(1, 5)
                this.speedY = Phaser.Math.Between(1, 5)
                
            }else if(this.originNum == 2){
                this.direction = "Go Down"
                this.originX = this.player.x;
                this.originY = this.player.y - 400;
                this.speedX = 0;
                this.speedY = Phaser.Math.Between(1, 5)
            }else if(this.originNum == 3){
                this.direction = "Go DownLeft"
                this.originX = this.player.x + 400;
                this.originY = this.player.y - 400;
                this.speedX = Phaser.Math.Between(-5, -1);
                this.speedY = Phaser.Math.Between(1, 5)
            }else if(this.originNum == 4){
                this.direction = "Go Left"
                this.originX = this.player.x + 400;
                this.originY = this.player.y;
                this.speedX = Phaser.Math.Between(-5, -1);
                this.speedY = Phaser.Math.Between(1, 5)

            }
            
            //console.log(this.direction)

            this.enemy = new spriteEnemy0(this, this.originX, this.originY, 'basicEnemy')
            this.enemy.speed.x = this.speedX;
            this.enemy.speed.y = this.speedY;

            this.groupEnemy0.add(this.enemy);
            
            console.log(this.direction)

        }
        */
        
        

    }
    spawnMultipleEnemies(time){
        let originalEnemy = new spriteEnemy0(this, 0, 0, 'basicEnemy')
        this.spacer = 40;
        if(originalEnemy.origin == "directAbove"){
            for(let i = 0; i < 3; i++){
                let newEnemy = new spriteEnemy0(this, 0, 0, 'basicEnemy')
                newEnemy.speed = {x:0, y:5}//originalEnemy.get('speed');
                newEnemy.origin = originalEnemy.get('origin');
                newEnemy.direction = originalEnemy.get('direction');
                newEnemy.x = originalEnemy.get('x') + this.spacer * i;
                newEnemy.y = originalEnemy.get('y');
                console.log(newEnemy.uid)
                this.groupEnemy0.add(newEnemy)
            }
        }
        else if(originalEnemy.origin == "topLeft"){
            for(let i = 0; i < 2; i++){
                let newEnemy = new spriteEnemy0(this, 0, 0, 'basicEnemy')
                newEnemy.speed = {x: 5, y: 5}//originalEnemy.get('speed');
                newEnemy.origin = originalEnemy.get('origin');
                newEnemy.direction = originalEnemy.get('direction');
                newEnemy.x = originalEnemy.get('x') + this.spacer * i;
                newEnemy.y = originalEnemy.get('y');
                console.log(newEnemy.uid)
                this.groupEnemy0.add(newEnemy)
            }
        }
        else if(originalEnemy.origin == "left"){
            for(let i = 0; i < 2; i++){
                let newEnemy = new spriteEnemy0(this, 0, 0, 'basicEnemy')
                newEnemy.speed = {x:5, y:0}//originalEnemy.get('speed');
                newEnemy.origin = originalEnemy.get('origin');
                newEnemy.direction = originalEnemy.get('direction');
                newEnemy.x = originalEnemy.get('x') //+ this.spacer * i;
                newEnemy.y = originalEnemy.get('y') + this.spacer * i;
                console.log(newEnemy.uid)
                this.groupEnemy0.add(newEnemy)
            }
        }
        else if(originalEnemy.origin == "right"){
            for(let i = 0; i < 2; i++){
                let newEnemy = new spriteEnemy0(this, 0, 0, 'basicEnemy')
                newEnemy.speed = {x: -5, y:0}//originalEnemy.get('speed');
                newEnemy.origin = originalEnemy.get('origin');
                newEnemy.direction = originalEnemy.get('direction');
                newEnemy.x = originalEnemy.get('x') //+ this.spacer * i;
                newEnemy.y = originalEnemy.get('y') + this.spacer * i;
                console.log(newEnemy.uid)
                this.groupEnemy0.add(newEnemy)
            }
        }
        else if(originalEnemy.origin == "topRight"){
            for(let i = 0; i < 2; i++){
                let newEnemy = new spriteEnemy0(this, 0, 0, 'basicEnemy')
                newEnemy.speed = {x: -5, y: 5}//originalEnemy.get('speed');
                newEnemy.origin = originalEnemy.get('origin');
                newEnemy.direction = originalEnemy.get('direction');
                newEnemy.x = originalEnemy.get('x') 
                + this.spacer * i;
                newEnemy.y = originalEnemy.get('y') //+ this.spacer * i;
                console.log(newEnemy.uid)
                this.groupEnemy0.add(newEnemy)
            }
        }
    }
    updateClocks(){
        //this.clock++;
        // this.clocks.enemy0++;
        // this.clocks.playerFire++;
    }
    fireWeapon(time){
        if(time > this.player.nextFire + this.player.fireRate){
            //console.log(time, "NOW")
            this.player.nextFire = time;

            if(!this.player.isHit){
                
                this.groupPlayerLasers.fireLaser(this.player.x, this.player.y - 20);

                // let laser = this.groupPlayerLasers.getFirstDead(false)
                
                //     if(laser){
                //         //laser.fire(this.player.x, this.player.y - 20)
                //         laser = new Laser(this, 0, 0)
                //         laser.fire(this.player.x, this.player.y - 20)
                        
                //     }

                    // const laser = new Laser(this, this.player.x, this.player.y - 20, 'laser')
                    // //console.log(laser)
                    // laser.setVelocityY(-400)
                    // this.groupPlayerLasers.add(laser)
                }
                
            
            // this.thisLaser = this.physics.add.sprite(this.player.x, this.player.y, "laser");
            

            // this.physics.add.collider(this.thisLaser, this.groupEnemy0, this.enemyHit)

            // //Make the laser interactive with all enemy:
            // for(let i = 0; i < this.groupEnemy0.length; i++){
            //     this.physics.add.collider(this.thisLaser, this.groupEnemy0, this.contact)
            // }

            

            // this.groupPlayerLasers.add(this.thisLaser)
            

        }
    }
    checkCollisions(){
        //this.physics.add.collider(this.arrayLasers, this.arrayEnemy0, this.enemyHit);
        this.physics.add.collider(this.player, this.arrayLasers, this.enemyHit);
        //if(this.checkCollisions.checkCollide)
        for(let i = 0; i < this.arrayLasers.length; i++){
            for(let j = 0; j < this.arrayEnemy0.length; j++){
                if(Collision.checkCollide(this.arrayLasers[i], this.arrayEnemy0[j])){
                   // alert('yo');
                }
            }
        }
    }
    enemyHit(laser, enemy){
        //alert('yo')
        //console.log(x)
        //laser.destroy();
        if(laser.isLive && enemy.isLive){
            laser.setVisible(false)
            laser.setActive(false)
            //enemy.setVisible(false)
            //enemy.setActive(false)
            //this.score += enemy.score
            //console.log(this.score)
            //enemy.destroy();
            emitter.emit("Enemy_Hit", enemy, this)
        }
    
    }
    contact(){
        //alert('hello')
    }
    checkCollisions(x,y){
        //alert('hello')
        //console.log(x, y)
        //alert('hello')
        
        
    }
    playerHit(x,y){
        
        // this.lives--;
        // if(this.lives >= 0)
        //     emitter.emit("Respawn")
        // else{
            emitter.emit("Handle_Player_Hit");
        //}

        //Have to use emiiter in order to pass the context of 'this' to the function:

        
    }
    respawnPlayer(){

    }

    test(){
        alert('hello')
    }

    goGameOver(){
        // this.player.on('animationcomplete-playerExplode', this.test, this);

        this.player.anims.play('playerExplode')
        this.player.isHit = true
        this.player.body.enable = false
        //this.physics.pause();
        //this.scene.start('SceneMain');
    }

    animateExplosion(key){
        //Find the correct enemy from the gameObjects of enemies:
        let target;

        this.groupBasicEnemies.children.iterate(function(child){
            if(child.active){
                if(key.uid === child.uid)
                    target = child
            }
            
        })

        //target.isHit = true;
        if(target){
        this.score += target.score
        this.scoreText.text = `score: ${this.score}`
        target.anims.play('basicExplosion');
        target.speed.x = 0;
        target.speed.y = 0;
        //key.body.allowGravity = false;
        target.body.setVelocity(0, 0);
        target.body.enable = false
        //target.setActive(false)
        //target.setVisible(false)
        //key.allowGravity(false)
        //key.moves = false;
        this.time.addEvent({
            delay: 1000,
            callback: () => {target.destroy();target.setActive(false); target.setVisible(false)},
            callbackScope: this.scene,
            loop: false
        })
        //key.reset(10, 10)
        //key.body.setVelocity(0,0);
    }

    }
}

    