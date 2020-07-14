let game;
let model;

//Used to let send messages to let different parts of our game communicate with each other
let emitter;
//G for Game:
let G;
let controller;

window.onload = () => {
    //Determines if tablet or mobile and we will use the appropriate config settings.
    let isMobile = navigator.userAgent.indexOf("Mobile");
    if(isMobile == -1){
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    //Mobile:
    if(isMobile == -1){
        this.config = {
            type: Phaser.Auto,
            width: 480,
            height: 640,
            parent: 'phaser-game',
            backgroundColor: '000',
            scene: [SceneLoad,SceneMain,SceneOver]
        }

    }
    //Tablet or Desktop:
    else{
        this.config = {
            type: Phaser.Auto,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            backgroundColor: '000',
            scene: [SceneLoad, SceneMain, SceneOver]
        }
    }
    G = new Constants();
    emitter = new Phaser.Events.EventEmitter();
    model = new Model();
    //emitter = new Phaser.Events.EventEmitter();
    //let us keep track if it is mobile or not to be used elswehere in code. (flatButton.js)
    model.isMobile = isMobile;
    game = new Phaser.Game(this.config);
    //this.scene.add(sceneMain)
}



