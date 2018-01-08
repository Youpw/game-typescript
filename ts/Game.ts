class Game {
    private _element: HTMLElement = document.getElementById('container');
    private _player: Mouse;
    private _rock: Rock;
    private _w = window.innerWidth;
    private _h = window.innerHeight;


    constructor() {
        this._player = new Mouse('rocketship');
        this._rock = new Rock('rock', 0);
        document.addEventListener('keydown', this.keyDownHandler);
        this._w -= 10;
        this._h -= 10;
        this.draw();
        this.moveDown();
    }

    public collision(): void {
        //use elem.getBoundingClientRect() for getting the wright coordinates and measurements of the element
        var dim1 = { x: 5, y: 5 }
        var dim2 = { x: 20, y: 10 }
        // stap1: kijk of rock-0 bestaat in de DOM

        // if (rock0exists)
        const rockRect = document.getElementById('rock-0').getBoundingClientRect();
        const rocketshipRect = document.getElementById('rocketship').getBoundingClientRect();


        const rockW = rockRect.right - rockRect.left;
        const rockH = rockRect.bottom - rockRect.top;

        const rocketshipW = rocketshipRect.right - rocketshipRect.left;
        const rocketshipH = rocketshipRect.bottom - rocketshipRect.top;

        if (rockRect.left < rocketshipRect.left + rocketshipRect.width &&
            rockRect.left + rockRect.width > rocketshipRect.left &&
            rockRect.top < rocketshipRect.top + rocketshipRect.height &&
            rockRect.height + rockRect.top > rocketshipRect.top) {
            // collision detected!
        // }

        // // filling in the values =>

        // if (5 < 30 &&
        //     55 > 20 &&
        //     5 < 20 &&
        //     55 > 10) {
        //     // collision detected!

        this._rock.remove(this._element);
        window.removeEventListener('keydown', this.keyDownHandler);
            console.log('collision');
            
        } else {
            
        }
    }

    public draw(): void {
        this._player.draw(this._element);
        this._rock.draw(this._element);
    }
    public update() {
        this._player.update();
        this._rock.update();
        this.collision();
    }

    public keyDownHandler = (e: KeyboardEvent) => {
        if (e.keyCode === 38) {
            console.log(this._player.yPos);
            if (this._player.yPos >= -700) {
                this._player.moveUp(10);
                this.update();
            }
            else {
                console.log("border reached -y");
            }
        }
        if (e.keyCode === 40) {
            if (this._player.yPos <= this._h) {
                this._player.moveDown(10);
                this.update();
            }
            else {
                console.log("border reached +y")
            }
        }
        if (e.keyCode === 37) {
            console.log(this._player.xPos);
            if (this._player.xPos >= -500) {
                this._player.moveLeft(10);
                this.update();
            }
            else {
                console.log("border reached -x")
            }
        }

        if (e.keyCode === 39) {
            if (this._player.xPos <= 500) {
                this._player.moveRight(10);
                this.update();
            }
            else {
                console.log("border reached +x")
            }
        }

    }

     public moveDown(){
        setTimeout(() => {
            const rockplace = this._rock.yPos;
            if(rockplace <= 500){                
                this._rock.moveDown();
            }
            else{
                this._rock.remove(this._element);
                this._rock = new Rock('rock', 0);
                this._rock.draw(this._element);
            }
            this.update();
            this.moveDown();
        }, 250);
     }



    
}

