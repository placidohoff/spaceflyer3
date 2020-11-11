let bar;
class SceneLoad extends Phaser.Scene{
    constructor(){
        super('SceneLoad');
    }
    preload(){
        //Placed the bar creation in the preload because error on line11 said I was using it before defined
        //this.scene = this;
        this.bar = new Bar({scene:this, x:game.config.width/2,y:game.config.height/2})
        this.bar.setPercent(.5);
        this.progText = this.add.text(game.config.width/2, game.config.height/2, "0%", {color: '#fff', fontSize: game.config.width/20})
        this.load.on('progress', this.onProgress, this);

        //Main Menu
            this.load.image('plybtn', 'assets/mybuttons/playnow.png', 193, 71);
            this.load.image('abtbtn', 'assets/mybuttons/about.png', 193, 71);
            //this.load.image('highscrbtn', 'assets/mybuttons/highscore.png', 193, 71);
            this.load.image('starfield', 'assets/starfield.jpg');
            this.load.image('title', 'assets/mytext/logo.png');

        //Game Screen
        //These two vars will need to be created within the scene itself most likely
        //var pad;
        //var stick;
            this.load.atlas('arcade', 'assets/joystick/arcade-joystick.png', 'assets/joystick/arcade-joystick.json');
            this.load.image('ship', 'assets/thrust.png');
            this.load.image('starfield', 'assets/starfield.jpg');
            this.load.image('laser', 'assets/laser.png', 13, 22);
            this.load.image('enemylaser', 'assets/enemylaser1.png', 13, 22);

            //thisr sprite;
            this.load.image('basicEnemy0', 'assets/spritesheets/enemy/basicenemy0.png');
            this.load.image('ufo', 'assets/spritesheets/enemy/ufoenemy.png')

            this.load.atlas('explosion_atlas', 'assets/spritesheets/explosions/explosionsheet.png', 'assets/spritesheets/explosions/explosionjson.json');
            this.load.atlas('playerexplosion_atlas', 'assets/spritesheets/explosions/explosionsplayer.png', 'assets/spritesheets/explosions/explosionsplayer.json');

            this.load.atlas('bigexplosion', 'assets/spritesheets/explosions/bigexplosion/bigexplosionsheet.png', 'assets/spritesheets/explosions/bigexplosion/bigexplosionsheet.json');


            this.load.image('bigufo', 'assets/bigufo.png');

            this.load.image('laserball', 'assets/laserball.png');

            this.load.image('powerup-shield', 'assets/powerups/powerup-shield.png');
            this.load.image('basic', 'assets/powerups/powerup-basic.png');
            this.load.image('powerup-bomb', 'assets/powerups/powerup-bomb.png');
            this.load.image('powerup-rapid', 'assets/powerups/powerup-rapid.png');
            this.load.image('powerup-speed', 'assets/powerups/powerup-speed.png');
            this.load.image('powerup-spray', 'assets/powerups/powerup-spray.png');


            this.load.image('energybar', 'assets/powerups/energybar.png');

            this.load.image('shipShield', 'assets/powerups/shipShield.png');

            this.load.image('missile', 'assets/powerups/missile.png');

            this.load.image("button1", "assets/ui/ui/buttons/2/1.png");
            this.load.image("button3", "assets/ui/ui/buttons/2/3.png");
            this.load.image("button2", "assets/ui/ui/buttons/2/2.png");
            
            this.load.image("spaceflyer", "assets/SpaceFlyer.png");

            this.load.spritesheet('basicEnemy', 
            'assets/basicEnemy.png',
        { frameWidth: 32, frameHeight: 32 })

            this.load.spritesheet('playerExplode', 'assets/playerExplosionSheet.png',
            {frameWidth: 58, frameHeight: 51})
        
        //bar;
        // alert('hello');
    }
    create(){
        this.scene.start('SceneTitle');


    }
    update(){

    }
    onProgress(value){
        console.log(value)
        this.bar.setPercent(value)
        value = Math.floor(value * 100);
        this.progText.setText(value + "%");
    }

    startGame(){

    }
}