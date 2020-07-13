class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain')
    }

    preload(){
        this.load.image("button1", "assets/ui/ui/buttons/2/1.png");
        this.load.image("button2", "assets/ui/ui/buttons/2/4.png");
        //alert("hello")
    }
    create(){
        let button1Text = {color: 'black', fontSize: 20}
        let flatButton = new FlatButton({scene: this, key: 'button1', text:'Click Me',  event:'button_pressed', params:'button1', textConfig: button1Text})
        let flatButton2 = new FlatButton({scene: this, key: 'button2', text:'Click Me',  event:'button_pressed', params: 'button2'})
        
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        //this.alignGrid.showNumbers();
        this.alignGrid.placeAtIndex(38, flatButton)
        this.alignGrid.placeAtIndex(71, flatButton2)

        emitter.on('button_pressed', this.buttonPressed, this)
    }
    update(){

    }
    buttonPressed(params){
        //alert(params)
        if(params == 'button2'){
            this.scene.start('SceneOver');
        }
    }
}