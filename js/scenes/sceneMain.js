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

        this.starfield = this.add.tileSprite(0, 160, game.width, game.height, 'starfield');
        this.starfield.setTilePosition(0,0)
        this.starfield.setInteractive();
        this.starfield.on('pointerdown', this.touch, this);

        this.clocks = {
            enemy0: 0,
            playerFire: 0
        };

        this.player = this.physics.add.sprite(400, 400, 'ship')
        //this.player.texture.baseTexture.scaleMode = PIXI.NEAREST;
        //this.player.scale.set(2);
        this.player.setOrigin(0.5, 0.5);
        //this.physics.arcade.enable(player);
        this.player.angle -= 90;
        this.player.nextFire = 0;
        this.player.fireRate = 500;
        Align.scaleToGameW(this.player, .1)
        //this.player.width = 200;
        //this.player.height = 200;
        this.player.score = 0;

        this.player.weapon = 'basic';
        this.fireRate = 500;
        this.ability = 'none';
        this.player.isDead = false;

        this.groupPlayerLasers = this.physics.add.group();

        

        // this.joyStick = this.plugins.get('rexvirtualjoystickplugin');
        
        this.enemyLevel = 0;


        this.nextEnemy0 = 50;
        this.groupEnemy0 = this.physics.add.group();

        

        //this.enemy = new BasicEnemy0({scene:this, x:100, y: 200, screenWidth: game.config.width, screenHeight: game.config.height})
        //this.enemy = this.physics.add.sprite(100, 200, 'basicEnemy0')
        //this.enemy = this.physics.add.sprite(100, 200, 'basicEnemy0')
        this.enemy = new spriteEnemy0(this, 100, 200, 'basicEnemy0')
        //this.enemy.setVelocity(50, 0);
        //this.enemy = new Enemy(this, 100, 200, 'basicEnemy0')
        this.groupEnemy0.add(this.enemy);
        //this.physics.add.collider(this.enemy, this.ground)

        this.arrayLasers = [];
        this.arrayEnemy0 = [];
        this.arrayEnemy0.push(this.enemy);
        this.physics.add.collider(this.player, this.groupEnemy0, this.playerHit);
        this.physics.add.collider(this.groupPlayerLasers, this.groupEnemy0, this.enemyHit);
        console.log(this.scene);
        //this.scene.start('SceneTitle')
    }
    update(){
        this.starfield.tilePositionY -= 2;

        this.groupEnemy0.children.iterate(function(child){
            child.update();
            //if(Collision.checkCollide(child,))
        })

        for(let i = 0; i < this.arrayLasers.length; i++){
            this.arrayLasers[i].y -= 5;
            if(this.arrayLasers[i].y < this.arrayLasers[i].trueZero){
                this.arrayLasers[i].destroy();
            }
        }

        //console.log(this.groupPlayerLasers.length)
        
        this.updateClocks();
        this.boundsCheck();
        this.spawnEnemy();
        this.fireWeapon();
        this.checkCollisions();
        
        //console.log(this.scene)
        //this.updateLasers();
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
        
       //this.move = this.physics.moveTo(this.ship, this.tx, this.ty, 60)
        console.log(this.tx = this.starfield.input.localX); 
        console.log(this.ty = this.starfield.input.localY);
        console.log(this.input.activePointer)
        this.physics.moveTo(this.player, this.input.activePointer.downX, this.input.activePointer.downY, 240)
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
    spawnEnemy(){
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

            this.enemy = new spriteEnemy0(this, this.originX, this.originY, 'basicEnemy0')
            this.enemy.speed.x = this.speedX;
            this.enemy.speed.y = this.speedY;

            this.groupEnemy0.add(this.enemy);
            
            console.log(this.direction)

        }
            
        

    }
    updateClocks(){
        //this.clock++;
        this.clocks.enemy0++;
        this.clocks.playerFire++;
    }
    fireWeapon(){
        if(this.clocks.playerFire > 50){
            this.clocks.playerFire = 0;
            //this.playerLaser = new Laser({scene:this, x:this.player.x + 15, y: this.player.y});
            //this.playerLaser.setGravityY(-200);
            this.thisLaser = this.physics.add.sprite(this.player.x, this.player.y, "laser");
            this.thisLaser.setVelocity(0, -100);

            this.physics.add.collider(this.thisLaser, this.groupEnemy0, this.enemyHit)

            //Make the laser interactive with all enemy:
            for(let i = 0; i < this.groupEnemy0.length; i++){
                this.physics.add.collider(this.thisLaser, this.groupEnemy0, this.contact)
            }

            //if(this.physics.world.overlap(this.))
            
            //this.arrayLasers.push(this.playerLaser);
            //this.playerLaser
            //this.playerLaser.angle = this.player.angle;

            //this.groupPlayerLasers.add(this.playerLaser);

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
    enemyHit(x, y){
        //alert('yo')
        console.log(x)
        x.destroy();
        y.destroy();
        //console.log(x)
        //x.destroy();
        //alert('Yo');
        //console.log('Hit!')

        //Itterate through each child of eneyGroup and check which one is collided. Destroy that one.
        

        // this.groupPlayerLasers.children.iterate(function(laser){
            
        //     this.groupEnemy0.children.iterate(function(enemy){
        //         if(Collision.checkCollide(laser, enemy)){
        //             laser.destroy();
        //             enemy.destroy();
        //         }    
        //     })
        // })
    
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
        //this.scene.scene.restart();
        //SceneMain.restart();
        //Phaser.Scene.restart();
        console.log(this.scene)
        x.destroy();
        y.destroy();
        Phaser.Scene.start('SceneTitle')
        //SceneMain.scene.start('SceneTitle')
        //this.scene.scene.start('SceneTitle')
        // this.scene.time.addEvent({
        //     delay: 0,
        //     callback: this.goGameOver,
        //     callbackScope: this.scene,
        //     loop: false
        // },this)
    }

    goGameOver(){
        this.scene.start('SceneTitle');
    }
}

    