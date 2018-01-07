class Mouse extends GameItem{
    /**
    * Function to create the Character
    * @param {string} - name
    * @param {number} - xPosition
    * @param {number} - yPosition
    */
    constructor(name: string, xPosition: number = 0, yPosition: number = 0) {
        super(name, xPosition, yPosition);
    }

    /**
    * Function to move the Character upwards
    * @param {number} - yPosition
    */
    public moveUp(yPosition: number): void {
        this._yPos -= yPosition;
        this._element.classList.add('flying');
    }
    
    public moveDown(yPosition: number): void {
        this._yPos += yPosition;
        this._element.classList.add('flying');
    }

    public moveLeft(xPosition: number): void {
        this._xPos -= xPosition;
        this._element.classList.add('flying');
    }

    public moveRight(xPosition: number): void {
        this._xPos += xPosition;
        this._element.classList.add('flying');
    }

}