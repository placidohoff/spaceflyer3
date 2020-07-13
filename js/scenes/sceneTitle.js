class SceneTitle extends Phaser.Scene{
    constructor(){
        super('SceneTitle')
    }
    preload(){
        this.load.image("title", "assets/title.png");
        this.load.image("button1", "assets/ui/ui/buttons/2/1.png");
    }
    create(){
        //alert("hello")
        //console.log("Hello")
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();


        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        //this.alignGrid.showNumbers();

        let title = this.add.image(0,0,'title');
        Align.scaleToGameW(title, .8);
        this.alignGrid.placeAtIndex(39, title)

        let btnStart = new FlatButton({scene: this, key: 'button1', text:'start', event:'start_game', x:0, y:0})
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on("start_game", this.startGame, this)
    }
    update(){

    }

    startGame(){
        this.scene.start('SceneMain');
    }
}