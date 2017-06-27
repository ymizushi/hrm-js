import _ from './crafty'

class Game {
  constructor() {
  }

  init() {
    Crafty.init(500,350, document.getElementById('game'));
    Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');
  }
}
export default Game;
