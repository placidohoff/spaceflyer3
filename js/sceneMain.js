class SceneMain extends Phaser.Scene {
    constructor(){
        super(SceneMain);
        //this.scene.add(this)
    }
    preload(){
        //load our images/sounds etc
        this.load.image("heart", "../assets/heart.jpg");
    }
    create(){
        //define our objects:
        let gridConfig = {
            row: 5,
            cols: 5,
            scene: this
        }
        let alignGrid = new AlignGrid(gridConfig);
        alignGrid.showNumbers();

        this.heart = this.add.sprite(10,10,"heart");
        this.heart.displayWidth = 80;
        this.heart.scaleY = this.heart.scaleX;
        this.heart.setOrigin(0,0);

        //Place the obj to the grid coords we want.
        //alignGrid.placeAt(2,2, this.heart)

        //The function treats each cell as an index, simplifying the placement:
        alignGrid.placeAtIndex(7, this.heart);
        Align.scaleToGameW(this.face, .2);
        //this.heart.anchor.setTo(0,0)
        //this.heart.setSize(1,1)
        //this.heart.scale.x = 1000;
        //this.heart.scale.y = 1000;

    }
    update(){

    }
}