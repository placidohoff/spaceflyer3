let game;
let model;

//Used to let send messages to let different parts of our game communicate with each other
let emitter;
//G for Game:
let G;
let controller;

window.onload = () => {
    //alert("Ready");
    let config = {
        type: Phaser.Auto,
        width: 480,
        height: 640,
        parent: 'phaser-game',
        backgroundColor: '000',
        scene: [SceneMain]
    }
    G = new Constants();
    model = new Model();
    game = new Phaser.Game(config);
    //this.scene.add(sceneMain)
}



