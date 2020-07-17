class SceneTitle extends Phaser.Scene{
    constructor(){
        super('SceneTitle')
    }
    preload(){
        
    }
    create(){
    //this.scene = this
       // alert('hello')
        // emitter = new Phaser.Events.EventEmitter();
        // controller = new Controller();


        // this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        // //this.alignGrid.showNumbers();

        // let title = this.add.image(0,0,'title');
        // Align.scaleToGameW(title, .8);
        // this.alignGrid.placeAtIndex(39, title)

        // let btnStart = new FlatButton({scene: this, key: 'button1', text:'start', event:'start_game', x:0, y:0})
        // this.alignGrid.placeAtIndex(93, btnStart);

        // emitter.on("start_game", this.startGame, this)

        this.starfield = this.add.tileSprite(0, 160, game.width, game.height, 'starfield');
        this.starfield.setTilePosition(0,0)
        //this.starfield.tileScaleY = 100;
        this.btnStart = new FlatButton({scene:this, key: 'button2', text:'start', event:'start_game', x:0, y:0})
        //this.btnStart.setOrigin(0.5,0.5);
        this.btnStart.x = game.config.width/2;
        this.btnStart.y = game.config.height - 100;
        // this.startButton = this.add.button(game.config.width/2, game.config.height/2 + 50, 'plybtn', this.playGame, this, 2, 1, 0);
        // this.startButton.setOrigin(0.5,0.5);
        // this.aboutButton = this.add.button(game.config.width/2, startButton.y + startButton.height + 10, 'abtbtn', this.about, this, 2, 1, 0);
        // this.aboutButton.setOrigin(0.5,0.5);

        // this.title = this.add.text(game.config.width /2, (game.config.heght /2) - 100, 'title')
        // this.title.setOrigin(0.5,0.5);

        // //	Font style
        // this.title.font = 'Arial Black';
        // this.title.fontSize = 50;
        // this.title.fontWeight = 'bold';

        this.title = this.add.image(game.config.width/2, 100, 'spaceflyer')
        this.title.setOrigin(0.5);
        Align.scaleToGameW(this.title, .7)
        //this.title.width = 200;

        //	Stroke color and thickness
        // this.title.stroke = '#000000';
        // this.title.strokeThickness = 6;
        // this.title.fill = 'purple';
        //this.scene.start('SceneMain');
        emitter.on("start_game", this.startGame, this)
    }
    update(){
        this.starfield.tilePositionY += 2;
       

    }

    startGame(){
        //alert('hello');
        this.scene.start('SceneMain');
    }
}