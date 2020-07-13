//Since we are sending messages back and forth, we want to make sure the message that we send match the messages we are listening for. Constants are good for this?
class Constants
{
    constructor()
    {
        //List of events to happen:
        this.SET_SCORE="setScore";
        this.UP_POINTS="upPoints";
        this.SCORE_UPDATED="scoreUpdated";
        this.PLAY_SOUND="playSound";
        this.MUSIC_CHANGED="musicChanged";
        this.TOGGLE_SOUND="toggleSound";
    }
}