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
            scene: [SceneMain]
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
            scene: [SceneMain]
        }
    }
    G = new Constants();
    model = new Model();
    game = new Phaser.Game(this.config);
    //this.scene.add(sceneMain)
}



