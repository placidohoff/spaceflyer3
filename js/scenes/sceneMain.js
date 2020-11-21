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

        this.key="basicEnemy"
        

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

class UfoEnemyGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: UfoEnemy,
            frameQuantity: 30,
            active: false,
            visible: false,
            //enable: false,
            key: 'ufo',
            //x: -500,
            //y: -500
        })
    }
    spawn(){
        let howMany = Phaser.Math.Between(0,4)
        for(let i = 0; i < howMany; i++){
            const ufo = this.getFirstDead(false)
            if(ufo){
                ufo.init()
            }
        }
        // const ufo = this.getFirstDead(false)
        // if(ufo){
        //     ufo.init()
        // }
    }
}

class UfoEnemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        //super(scene);
        super(scene, -10, -10, 'ufo')
        this.scene=scene
 
    }
    init(){
        let x = Phaser.Math.Between(0, screen.width)
        this.body.reset(x, -50);

        this.setActive(true);
        this.setVisible(true);
        this.isReady = false;
        this.direction = '';
        this.isReverse = false;
        this.speedX = Phaser.Math.Between(2,9)
        if(this.speedX >= 5){
            this.isReverse = Phaser.Math.Between(0,100)
            if(this.isReverse >= 70)
                this.isReverse = true;
            else
                this.isReverse = false;
        }
        this.fireRate = Phaser.Math.Between(500, 2000);
        this.nextFire = 0;

        this.uid = Phaser.Math.Between(0, 20000)
        this.key = "ufo"
        this.isLive = true

            
        //this.groupUfoLasers = new UfoLasersGroup(this.scene);
        
        this.tween = this.scene.tweens.add({
            targets: this,
            y: 200,
            // alpha: { start: 0, to: 1 },
            // alpha: 1,
            // alpha: '+=1',
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            
        })
        this.tween.on('complete', function(){
            //console.log('ready')
            if(this.x < this.scene.player.x){
                this.direction = "right"
                //this.speedX = 5;
            }
            else if(this.x > this.scene.player.x){
                this.direction = "left"
                this.speedX *= -1;
            }
            else{
                this.direction = "left"
                this.isReverse = true;
                this.speedX *= -1;
            }
            this.isReady = true;
            //console.log(this.scene.player.xs)
        }, this);
        

        
    }
    update(time){
        if(this.isReady){
            this.x += this.speedX;

            if(this.isReverse){
                if(this.x <= 0 || this.x >= screen.width){
                    this.speedX *= -1;
                    this.isReverse = false;
                }
            }

            if(this.x < -10 || this.x > screen.width + 10){
                this.setActive(false);
                this.setVisible(false);

            }

            if(time > this.nextFire + this.fireRate){
                //console.log(time, "NOW")
                this.nextFire = time;
                this.scene.groupUfoLasers.shoot(this.x, this.y)
                //console.log("fire")
            }
        }
    }
}

class UfoLasersGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: UfoLaser,
            frameQuantity: 50,
            active: false,
            visible: false,
            //enable: false,
            key: 'enemyLaser',
            //x: -500,
            //y: -500
        })
    }
    shoot(x,y){
        const laser = this.getFirstDead(false)
            if(laser){
                laser.fire(x,y)
            }
    }
}

class UfoLaser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'enemyLaser')
        //this.body.enable(false)
    }

    fire(x, y){
        //this.isLive = true
        this.isLive = true;
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        //this.ySpeed = -10;

        this.setVelocityY(400)

        
    }

    

    update(){
        //this.y -
        //this.y += this.ySpeed;
        if(this.y >= screen.height + 10){
            this.setActive(false)
            this.setVisible(false)
        }
    }
}


class CoinsGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: Coin,
            frameQuantity: 30,
            active: false,
            visible: false,
            //enable: false,
            key: 'coins',
            //x: -500,
            //y: -500
        })
        
    }
        dropCoin(x,y){
        let dropX, dropY;
        if(x && y){
            dropX = x; dropY = y
        }else{
            dropX = Phaser.Math.Between(0, screen.width)
            dropY = -200;
        }
        
        const coin = this.getFirstDead(false)
            if(coin){
                coin.drop(dropX,dropY)
            }
        }
        dropCoins(){
            let dropX, dropY;
            let howMany = Phaser.Math.Between(0,5)
            for(let i = 0; i < howMany; i++){
                const coin = this.getFirstDead(false)
                if(coin){
                    dropX = Phaser.Math.Between(0, screen.width)
                    dropY = Phaser.Math.Between(-400, -20)//-200;
                    coin.drop(dropX, dropY)
                }
             }
        }

}

class Coin extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'coins')
        //this.scale()

        // this.displayWidth *= .5;
        // this.scaleY = this.scaleX;
        //this.body.enable(false)
        this.isLive = false;
    }
    scale(){
        // this.displayWidth *= .5;
        // this.scaleY = this.scaleX;
    }

    drop(x,y){
        //this.isLive = true
        //console.log("dropping")
        //this.isLive = false;
        //let x = Phaser.Math.Between(0, screen.width)

        // if(!x && !y){
        //     let x = Phaser.Math.Between(0, screen.width)
        //     let y = -200;
        // }
        this.uid = Phaser.Math.Between(0, 20000)


        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        //this.ySpeed = -10;

        //this.setVelocityY(400)
        this.speedY = 5;

        if(!this.isLive){
            this.displayWidth *= .5;
            this.scaleY = this.scaleX;
            this.isLive = true
        }

        

        this.anims.play('coinRotate')

        
    }

    

    update(){
        //this.y -
        this.y += this.speedY;
        if(this.y >= screen.height + 10){
            this.setActive(false)
            this.setVisible(false)
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
        //this.arrowMover = this.physics.add.sprite(this.player.x, this.player.y + this.player.height + 10 , 'arrowmover')



        this.groupPlayerLasers = new LaserGroup(this);
        
        this.groupBasicEnemies = new BasicEnemyGroup(this)
        
        this.groupUfoEnemies = new UfoEnemyGroup(this)
        this.groupUfoLasers = new UfoLasersGroup(this);

        this.groupCoins = new CoinsGroup(this)

        
        this.enemyLevel = 0;


        this.nextEnemy0 = 50;
        this.lastEnemyTime = 0;
        this.enemyTimeRate = 1500;
        
        this.ufoTimeRate = 1500;

        this.nextPowerUp = 0;
        this.lastPowerUp = 0;
        this.powerUpRate = 5000;


        this.addCollisions()
        //Player's lasers hitting enemies:
        this.physics.add.collider(this.groupPlayerLasers, this.groupBasicEnemies, this.enemyHit);
        this.physics.add.collider(this.groupPlayerLasers, this.groupUfoEnemies, this.enemyHit);


        // //Player gets hit:
        // this.physics.add.collider(this.player, this.groupBasicEnemies, this.playerHit);
        // this.physics.add.collider(this.player, this.groupUfoEnemies, this.playerHit);
        // this.physics.add.collider(this.player, this.groupUfoLasers, this.playerHit);
        
        
        


        this.cursors = this.input.keyboard.createCursorKeys();

        emitter.on("Game_Over", this.goGameOver, this);
        emitter.on("Enemy_Hit", this.animateExplosion, this)
        emitter.on("Respawn", this.respawnPlayer, this);
        emitter.on("Handle_Player_Hit", this.handlePlayerHit, this);
        emitter.on("Handle_Collect_Coins", this.collectCoin, this);
        emitter.on("start_game", () => {this.scene.start('SceneMain');}, this);

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
        this.anims.create({
            key: 'coinRotate',
            frames: this.anims.generateFrameNumbers('coins', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1
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
        //if(!this.isGameOver)
            this.starfield.tilePositionY -= 2;


        this.groupBasicEnemies.children.iterate(function(child){
            if(child.active)
                child.update();
        })

        this.groupUfoEnemies.children.iterate(function(child){
            if(child.active)
                child.update(time);
        })

        this.groupUfoLasers.children.iterate(function(child){
            if(child.active)
                child.update(time);
        })

        this.groupCoins.children.iterate(function(child){
            if(child.active)
                child.update(time);
        })

        // this.player.x += this.player.speed.x;
        // this.player.y += this.player.speed.y;
        
        this.checkInput();
        this.updateClocks();
        this.boundsCheck();
        //if(time > this.lastEnemyTime + this.enemyTimeRate)
        this.spawnEnemy(time);
        if(!this.isGameOver)
            this.dropPowerUp(time);
        //this
        this.fireWeapon(time);
        this.checkCollisions();
        
        //console.log(this.scene)
        this.updateLasers();
    }
    collectCoin(coin){
        //console.log(coin)
        //Find the correct enemy from the gameObjects of enemies:
        let correctCoin;
        //console.log("Hit Detected")

        
            this.groupCoins.children.iterate(function(child){
                if(child.active){
                    if(coin.uid === child.uid)
                        correctCoin = child
                }
                
            })
         


        //target.isHit = true;
        if(correctCoin){
            this.score++;
            this.scoreText.text = `score: ${this.score}`
            
            correctCoin.body.enable = false
            correctCoin.body.setVelocity(0, 0);
            
            correctCoin.destroy();
            correctCoin.setActive(false); 
            correctCoin.setVisible(false)
            
            // this.time.addEvent({
            //     delay: 1000,
            //     callback: () => {target.destroy();target.setActive(false); target.setVisible(false)},
            //     callbackScope: this.scene,
            //     loop: false
            // })
            
        }
    }
    dropPowerUp(time){
        if(time > this.lastPowerUp + this.powerUpRate){
            //console.log(time, "NOW")
            //console.log("Awaiting drop")
            this.lastPowerUp = time;

            let howMany = Phaser.Math.Between(0, 100)
            if(howMany < 50)
                this.groupCoins.dropCoin();
            else    
                this.groupCoins.dropCoins();

                            

        }
    }
    addCollisions(){

        //Player gets hit:
        this.physics.add.collider(this.player, this.groupBasicEnemies,()=> {emitter.emit("Handle_Player_Hit");});
        this.physics.add.collider(this.player, this.groupUfoEnemies, ()=> {emitter.emit("Handle_Player_Hit");});

        this.physics.add.collider(this.player, this.groupUfoLasers, ()=> {emitter.emit("Handle_Player_Hit");});

        this.physics.add.collider(this.player, this.groupCoins, (x,y)=> {/*emitter.emit("Handle_Collect_Coins");*/this.collectCoin(y)});


    }
    spawnPlayer(endPoint){
        if(!endPoint){
            endPoint={x:screen.width/2, y: screen.height-300}
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
        this.player.isInvulnerable = true;
        this.player.body.enable = false;

        //////DRAGGABLE LOGIC:
        this.player.setInteractive();
        this.input.setDraggable(this.player)
        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        })

        //this.physics.add.collider(this.player, this.groupBasicEnemies, this.playerHit);
        this.addCollisions();

        let tweenComplete = false;
        
        
        this.arrowMover = this.physics.add.sprite(endPoint.x,  -endPoint.y , 'arrowmover')
        this.arrowMover.displayWidth *= .25;
        this.arrowMover.scaleY = this.arrowMover.scaleX;

        this.tweens.add({
            targets: this.player,
            y: endPoint.y,
            duration: 800,
            ease: 'Linear',
            //callback: () => {this.player.body.enable = true}
            //callbackScope
            //completeDelay: 3000
        });
        this.time.addEvent({
            delay: 1200,
            callback: () => 
                {
                    this.player.body.enable = true    
                
                },
            callbackScope: this.scene,
            loop: false
        })


        // this.arrowMover = this.physics.add.sprite(this.player.x, endPoint.y + this.player.height + 10 , 'arrowmover')
        // this.arrowMover.displayWidth *= .25;
        // this.arrowMover.scaleY = this.arrowMover.scaleX;

        this.arrowMover.body.reset(this.player.x, endPoint.y + this.player.height + 10)
        this.tweens.add({
            targets: this.arrowMover,
            alpha: { start: 0, to: 1 },
            duration: 600,
            ease: 'Power 1',
            //callbackScope
            //completeDelay: 3000
        });

        this.arrowMover.setInteractive();
        this.input.setDraggable(this.arrowMover)
        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

            this.player.x = dragX;
            this.player.y = dragY - 10 - this.player.height;

        },this)

        
        //console.log(this.arrowMover.x, '    ',this.arrowMover.y)

        // if(tweenComplete){
        //     this.arrowMover = this.physics.add.sprite(this.player.x, this.player.y + this.player.height + 10 , 'arrowmover')

        // }

        //ArrowMover:


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
        //if(!this.player.isInvulnerable){
        this.arrowMover.destroy();
        this.player.anims.play('playerExplode')
        this.player.isHit = true
        this.player.body.enable = false
        this.player.isWaitingToRespawn = true;

        // this.tweens.add({
        //     targets: this.arrowMover,
        //     alpha: 0,
        //     duration: 1000,
        //     ease: 'Linear',
        //     //completeDelay: 3000
        // });
        this.arrowMover.destroy();
        console.log(this.arrowMover)

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

            this.btnStart = new FlatButton({scene:this, key: 'button2', text:'Play Again', event:'start_game', x:0, y:0})

        this.btnStart.x = screen.width/2;
        this.btnStart.y = screen.height - 100;
        console.log(this.btnStart)

        //this.btn = this.physics.add.sprite(200, 500, 'button1')

        }
    //}
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
        let whichEnemy = Phaser.Math.Between(0, 100);
        //whichEnemy = 8;
        //if(!this.isGameOver){
            if(whichEnemy < 75){
                if(time > this.lastEnemyTime + this.enemyTimeRate){
                    this.lastEnemyTime = time;

                    if(!this.isGameOver)
                        this.groupBasicEnemies.spawn(this.player.x, this.player.y)           
                    
                }
            }
        //}
        else{
            if(time > this.lastEnemyTime + this.ufoTimeRate){
                //console.log("spawn")
                this.lastEnemyTime = time;

                this.groupUfoEnemies.spawn()
            }
        }
        
        

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
                
                this.groupPlayerLasers.fireLaser(this.player.x, this.player.y - 20, 'player');

            }
                            

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
        //console.log("Hit Detected")
        if(laser.isLive && enemy.isLive){
            //console.log("Hit Detected")
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
    
    respawnPlayer(){

    }

    test(){
        alert('hello')
    }

    goGameOver(){
        // this.player.on('animationcomplete-playerExplode', this.test, this);

        // this.btnStart = new FlatButton({scene:this, key: 'button2', text:'Play Again', event:'start_game', x:0, y:0})

        // this.btnStart.x = screen.width/2;
        // this.btnStart.y = screen.height - 100;
        // console.log(this.btnStart)

        this.btn = this.physics.add.sprite(200, 500, 'button1')

        this.player.anims.play('playerExplode')
        this.player.isHit = true
        this.player.body.enable = false
        this.physics.pause();
                //this.btnStart.setOrigin(0.5,0.5);
        

        //this.isGameOver = true
        //this.scene.start('SceneMain');
    }

    animateExplosion(key){
        //Find the correct enemy from the gameObjects of enemies:
        let target;
        //console.log("Hit Detected")

        if(key.key =='basicEnemy'){
            this.groupBasicEnemies.children.iterate(function(child){
                if(child.active){
                    if(key.uid === child.uid)
                        target = child
                }
                
            })
        } 
        else if(key.key == 'ufo'){
            this.groupUfoEnemies.children.iterate(function(child){
                if(child.active){
                    if(key.uid === child.uid)

                        target = child
                }
                
            })
        } 

        //target.isHit = true;
        if(target){
            //this.score += target.score
            // this.scoreText.text = `score: ${this.score}`
            target.anims.play('basicExplosion');
            if(target.key=="basicEnemy"){
                target.speed.x = 0;
                target.speed.y = 0;
            }
            if(target.key=="ufo"){
                target.speedX = 0;
                //target.speed.y = 0;
            }
            //key.body.allowGravity = false;
            target.body.setVelocity(0, 0);
            target.body.enable = false
            //target.setActive(false)
            //target.setVisible(false)
            //key.allowGravity(false)
            //key.moves = false;
            this.time.addEvent({
                delay: 1000,
                callback: () => 
                    {
                        target.destroy();
                        target.setActive(false); 
                        target.setVisible(false)
                        
                    
                    },
                callbackScope: this.scene,
                loop: false
            })
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    let spawnCoin = Phaser.Math.Between(0,100)
                        //spawnCoin=85
                    if(spawnCoin > 70){
                            //console.log(this.groupCoins)
                        this.groupCoins.dropCoin(target.x, target.y)
                    }
                },
                callbackScope: this.scene,
                loop: false
            })
            
            
            //key.reset(10, 10)
            //key.body.setVelocity(0,0);
        }

    }
}

    