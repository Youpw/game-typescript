class Game {
    private _element: HTMLElement = document.getElementById('container');
    private _player: Mouse;
    private _rock: Rock;
    private _w = window.innerWidth;
    private _h = window.innerHeight;
    private _scoreboard : Scoreboard;


    constructor() {
        this._player = new Mouse('rocketship');
        this._rock = new Rock('rock', 0);
        document.addEventListener('keydown', this.keyDownHandler);
        this._w -= 10;
        this._h -= 10;
        this.draw();
        this.moveDown();
        const gameInformation = document.createElement('div');
        gameInformation.className = 'gameInformation';
        this._element.appendChild(gameInformation);

        this._scoreboard = new Scoreboard(gameInformation); //could also be an event.
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

        this._rock.remove(this._element);
        window.removeEventListener('keydown', this.keyDownHandler);
            console.log('collision');
            
        } else {
            
        }
    }
    //recreate the classes instances
    public draw(): void {
        this._player.draw(this._element);
        this._rock.draw(this._element);
    }
    //update alles zodat alle draws worden uitgevoerd en word gekeken of er collision is
    public update() {
        this._player.update();
        this._rock.update();
        this.collision();
    }
    //read the arrow movements to activate movement on the Mouse
    public keyDownHandler = (e: KeyboardEvent) => {
        if (e.keyCode === 38) {
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
            if (this._player.xPos >= 0) {
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
    //loop the moveDown function of rock
     public moveDown(){
        setTimeout(() => {
            const rockplace = this._rock.yPos;
            if(rockplace <= 600){                
                this._rock.moveDown();
            }
            else{
                this._rock.remove(this._element);
                this._rock = new Rock('rock', 0);
                this._rock.draw(this._element);
                Events.trigger('addScore', {temp:'someInformation'});
                console.log(this._scoreboard);
                
            }
            this.update();
            this.moveDown();
        }, 50);
     }



    
}

