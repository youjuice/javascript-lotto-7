import { Console } from '@woowacourse/mission-utils';
import LottoGenerator from './LottoGenerator.js';
import WinningChecker from './WinningChecker.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Lotto from './Lotto.js';
import Validator from "../utils/Validator.js";

class LottoGame {
    #lottoGenerator;

    constructor() {
        this.#lottoGenerator = new LottoGenerator();
    }

    async play() {
        const purchasedLottos = await this.#purchaseLottos();
        OutputView.printPurchasedLottos(purchasedLottos);

        const winningLotto = await this.#getWinningLotto();
        const bonusNumber = await this.#getBonusNumber(winningLotto);

        const winningChecker = new WinningChecker(winningLotto, bonusNumber);
        const statistics = winningChecker.createWinningStatistics(purchasedLottos);

        OutputView.printWinningStatistics(statistics);
    }

    async #purchaseLottos() {
        while (true) {
            try {
                const amount = await InputView.readPurchaseAmount();
                return this.#lottoGenerator.generate(amount);
            } catch (error) {
                Console.print(error.message);
            }
        }
    }

    async #getWinningLotto() {
        while (true) {
            try {
                const winningNumbers = await InputView.readWinningNumbers();
                return new Lotto(winningNumbers);
            } catch (error) {
                Console.print(error.message);
            }
        }
    }

    async #getBonusNumber(winningLotto) {
        while (true) {
            try {
                const bonusNumber = await InputView.readBonusNumber();
                Validator.validateBonusNumber(bonusNumber, winningLotto.getNumbers());
                return bonusNumber;
            } catch (error) {
                Console.print(error.message);
            }
        }
    }
}

export default LottoGame;