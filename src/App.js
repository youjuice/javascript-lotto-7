import LottoGame from './domain/LottoGame.js';

class App {
  #game;

  constructor() {
    this.#game = new LottoGame();
  }

  async run() {
    await this.#game.play();
  }
}

export default App;