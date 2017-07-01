import _ from './crafty'

export class Game {
    constructor() {
    }

    init() {
        Crafty.init(640, 360, document.getElementById('game'));
        Crafty.e('2D, Tween, Canvas, Color, Fourway')
            .attr({x: 20, y: 100, w: 50, h: 200})
            .tween({x: 200, y: 200}, 1000)
            .color('#8e2622')
            .fourway(400);
    }
}
