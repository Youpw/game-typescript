/// <reference path="gameItem.ts" />

class Rock extends GameItem {
    private _id: number;

    /**
    * Function to create the GameItem
    * @param {string} - name
    * @param {number} - id
    * @param {number} - xPosition
    * @param {number} - yPosition
    */
    constructor(name: string, id: number, xPosition: number = 0, yPosition: number = 0) {
        super(name, xPosition, yPosition);
        this._id = id;
    }

    /**
    * Function to draw the initial state of the coin
    * @param {HTMLElement} - container
    */
    //recreate the class with new changes
    public draw(container: HTMLElement): void {
        //create div
        console.log('draw');
        
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = `${this._name}-${this._id}`;
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;

        //create image
        const image = document.createElement('img');
        image.src = `./assets/${this._name}.png `;

        //append elements
        this._element.appendChild(image);
        container.appendChild(this._element);

        let rnd = Math.floor(Math.random() * 100) + 1;
        this._element.style.left = rnd + "%";
    }
    //move the object down
    public moveDown(): void {
        this._yPos += 10;

    }
    /**
    * Function to remove the coin from the DOM
    * @param {HTMLElement} - container
    */
    public remove(container: HTMLElement): void {
        const elem = document.getElementById(`${this._name}-${this._id}`);
        container.removeChild(elem);
    }
}