class TestGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene){
        super(scene.physics.world, scene)

        scene.add.existing(this)

        this.createMultiple({
            classType: Laser,
            frameQuantity: 30,
            active: false,
            visible: true,
            key: 'laser'
        })
    }

    fire(x, y){
        const laser = this.getFirstDead(false)
        if(laser){
            laser.fire(x, y)
        }
    }
}