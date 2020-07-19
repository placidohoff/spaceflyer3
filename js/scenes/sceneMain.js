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

        

        this.enemy = new BasicEnemy0({scene:this, x:100, y: 200, screenWidth: game.config.width, screenHeight: game.config.height})
        this.groupEnemy0.add(this.enemy);
    }
    update(){
        this.starfield.tilePositionY -= 2;

        this.groupEnemy0.children.iterate(function(child){
            child.update();
            //if(Collision.checkCollide(child,))
        })

        this.groupPlayerLasers.children.iterate(function(child){
            child.y -= 5;
            if(child.y <= 10){
                //child.destroy();
                //child.setActive(false)
                //child.setVisible(false)
                //alert('hello')
                child
            }
        })
        
        this.updateClocks();
        this.boundsCheck();
        this.spawnEnemy();
        this.fireWeapon();
        this.checkCollisions();
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
            console.log("Hello")
            this.clocks.enemy0 = 0;
            
            return;
        }

    }
    updateClocks(){
        //this.clock++;
        this.clocks.enemy0++;
        this.clocks.playerFire++;
    }
    fireWeapon(){
        if(this.clocks.playerFire > 20){
            this.clocks.playerFire = 0;
            this.playerLaser = this.physics.add.sprite(this.player.x + 15, this.player.y, 'laser');
            this.playerLaser.angle = this.player.angle;

            this.groupPlayerLasers.add(this.playerLaser);

        }
    }
    checkCollisions(){
        this.physics.add.collider(this.groupPlayerLasers, this.groupEnemy0, this.enemyHit);
    }
    enemyHit(x, y){
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
}