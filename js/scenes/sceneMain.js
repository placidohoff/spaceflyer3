class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMains')
    }

    preload(){
        this.load.image("button1", "assets/ui/ui/buttons/2/1.png");
        this.load.image("button2", "assets/ui/ui/buttons/2/4.png");
    }
    create(){
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        let button1Text = {color: 'black', fontSize: 20}
        let flatButton = new FlatButton({scene: this, key: 'button1', text:'Click Me', x:220, y:100, event:'button_pressed', params:'button1', textConfig: button1Text})
        let flatButton2 = new FlatButton({scene: this, key: 'button2', text:'Click Me', x:220, y:300, event:'button_pressed', params: 'button2'})
        
        emitter.on('button_pressed', this.buttonPressed, this)
    }
    update(){

    }
    buttonPressed(params){
        alert(params)
    }
}