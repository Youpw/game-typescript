/// <reference path="Game.ts" />
let app: any;

(function () {
    /** 
    * Run after dom is ready 
    */
    let init = function () {
        app = new Game();
    };
    window.addEventListener('load', init);
})(); 