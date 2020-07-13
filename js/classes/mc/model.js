class Model
{
    constructor()
    {
        this._score = 0;
        this._soundOn = true;
        this._musicOn = true;
    }
    set musicOn(val)
    {
        this._musicOn = val;
        emitter.emit(G.MUSIC_CHANGED);
    }
    get musicOn()
    {
        return this._musicOn;
    }
    set score(val)
    {
        this._score = val;
        console.log("Score Updated")
        //Every time the score gets changed, we call this emitter to change the scoreBox:
        emitter.emit(G.SCORE_UPDATED);
    }
    get score()
    {
        return this._score;
    }
}