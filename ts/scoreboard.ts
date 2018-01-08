class Scoreboard{
    /**
     * Create a Scoreboard.
     * @param {number} _score - The score value.
     * @param {element} _el - The dom element representation.
     * @param {element} _parent - The parent of the dom element representation.
     */

    private _score : number;
    private _el : Element;
    private _parent : Element;
    
    constructor(element : Element){
        this._score = 0;
        this._parent = element;
        this.render();
        Events.on('startingPosition', () => this.resetScore(0)); //after event scope is lost :-/; arrow function to the rescue
        Events.on('addScore', () => this.addScore()); //after event scope is lost :-/; arrow function to the rescue
    }

    /**
     * Resets the score of the scoreboard.
     * @param {number} score - The string containing two comma-separated numbers
     */
    public resetScore(score : number){
        this._score = score;
        this._el.innerHTML = String(this._score); //nicer if in render()
    }

    /**
     * Add the score with one.
     */
    public addScore(){
        this._score++;
        this._el.innerHTML = String(this._score); //nicer if in render()
    }

    /**
     * Renders the DOM representation of scoreboard (better to use a template)
     */
    public render(){
        //create scoreboard
        this._el = document.createElement('div');
        this._el.className = 'score';
        this._el.innerHTML = String(this._score);
        this._parent.appendChild(this._el);
    }
}