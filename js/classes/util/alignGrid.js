class AlignGrid
{
    constructor(config)
    {
        this.config = config;
        if(!config.scene){
            console.log("Missing Scene");
            return;
        }
        if(!config.rows){
            config.rows = 5;
        }
        if(!config.cols){
            config.cols = 5;
        }
        if(!config.height){
            config.height = game.config.height;
        }
        if(!config.width){
            config.width = game.config.width;
        }

        //Make the scene accessable via state
        this.scene = config.scene;

        //We define the width.height of each grid-cell
        this.cw = config.width/config.cols;
        this.ch = config.height/config.rows;
    }

    //With this we can make the grid visible to us
    show()
    {
        this.graphics = this.scene.add.graphics();
        //Line thickness and color:
        this.graphics.lineStyle(2, 0xff0000);

        //Set the grids to be drawn vertically
        for(let i = 0; i < this.config.width; i += this.cw){
            //The following moves our graphics 'cursor' to the appropriate 'x' spot, then draws a vertical line, stopping at a spot which we specify to be the height of the screen.
            this.graphics.moveTo(i,0);
            this.graphics.lineTo(i, this.config.height);
        }
        //Set the grids to be drawn horizontally
        for(let i = 0; i < this.config.height; i += this.ch){
            //The following moves our graphics 'cursor' to the appropriate 'x' spot, then draws a vertical line, stopping at a spot which we specify to be the height of the screen.
            this.graphics.moveTo(0,i);
            this.graphics.lineTo(this.config.width, i);
        }

        //This actually draws the line. Looks the graphics objects stores where to draw lines to all within the forLoop before actually drawing. It stores then draws at once?
        this.graphics.strokePath();
    }

    //Logic to place an obj where we want on the grid:
    placeAt(xx, yy, obj)
    {
        //Calculate Position based on cellwidth and cellheight:
        let x2 = this.cw * xx;
        let y2 = this.ch * yy;

        obj.x = x2;
        obj.y = y2;
    }

    //More simplified, treats each grid cell as an index, we pass in which index we want to place the obj at.
    placeAtIndex(index, obj)
    {
        let yy = Math.floor(index/this.config.cols);
        let xx = index - (yy * this.config.cols);

        this.placeAt(xx, yy, obj);
    }

    showNumbers()
    {
        this.show()
        let count = 0;
        for(let i = 0; i < this.config.rows; i++){
            for(let j = 0; j < this.config.cols; j++){
                let numText = this.scene.add.text(0,0,count,{color: '#ff0000'});
                numText.setOrigin(0, 0);
                this.placeAtIndex(count, numText);

                count++;
            }
        }
    }
}