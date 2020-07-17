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

        this.player = this.physics.add.sprite(400, 400, 'ship')
        //this.player.texture.baseTexture.scaleMode = PIXI.NEAREST;
        //this.player.scale.set(2);
        this.player.setOrigin(0.5, 0.5);
        //this.physics.arcade.enable(player);
        this.player.angle -= 90;
        this.player.nextFire = 0;
        this.player.fireRate = 500;
        this.player.width = 50;
        this.player.height = 50;
        this.player.score = 0;

        this.player.weapon = 'basic';
        this.fireRate = 500;
        this.ability = 'none';
        this.player.isDead = false;

        this.joyStick = this.plugins.get('rexvirtualjoystickplugin');
        // let mediaManager = new MediaManager({scene: this});
        // mediaManager.setBackgroundMusic('backgroundMusic')

        //let sb = new SoundButtons({scene: this});
        // this.pad = this.plugins.add(Phaser.VirtualJoystick);
        // this.stick = pad.addStick(600, 300, 150, 'arcade');
        // this.stick.alignBottomRight();

        this.starfield.setInteractive();
        this.starfield.on('pointerdown', this.touch, this);
        //this.tx = this.starfield.input.localX
        //this.ty = this.starfield.input.localY
    }
    update(){
        //this.starfield.tilePositionY += 2;
        this.boundsCheck();
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
}