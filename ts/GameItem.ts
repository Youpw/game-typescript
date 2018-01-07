class GameItem{
    protected _element: HTMLElement;
    protected _name: string;
    protected _xPos: number;
    protected _yPos: number;

    /**
    * Function to create the GameItem
    * @param {string} - name
    * @param {number} - xPosition
    * @param {number} - yPosition
    **/

    constructor(name:string, xPos:number, yPos:number) {
        this._name = name;
        this._xPos = xPos;
        this._yPos = yPos;
    }

    public set xPos(xPosition:number){
        this._xPos += xPosition;
    }

    public set yPos(yPosition:number){
        this._yPos += yPosition;
    }

    public get yPos():number{
       return this._yPos;
    }

    public get xPos():number{
        return this._xPos;
     }

    public draw(container: HTMLElement): void {
        //create div
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;

        //create image
        const image = document.createElement('img');
        image.src = `./assets/${this._name}.png `;

        //append elements
        this._element.appendChild(image);
        container.appendChild(this._element);
    }

    /**
    * Function to update the state of the GameItem in the DOM
    */    
    public update(): void {
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;
    }
}