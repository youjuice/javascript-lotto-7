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
        await this.#showLottoResult(purchasedLottos);
    }

    async #showLottoResult(purchasedLottos) {
        OutputView.printPurchasedLottos(purchasedLottos);

        const winningLotto = await this.#getWinningLotto();
        const bonusNumber = await this.#getBonusNumber(winningLotto);

        const statistics = this.#calculateStatistics(winningLotto, bonusNumber, purchasedLottos);
        OutputView.printWinningStatistics(statistics);
    }

    async #retryOnError(operation) {
        while (true) {
            try {
                return await operation();
            } catch (error) {
                Console.print(error.message);
            }
        }
    }

    async #purchaseLottos() {
        return this.#retryOnError(async () => {
            const amount = await InputView.readPurchaseAmount();
            return this.#lottoGenerator.generate(amount);
        });
    }

    async #getWinningLotto() {
        return this.#retryOnError(async () => {
            const winningNumbers = await InputView.readWinningNumbers();
            return new Lotto(winningNumbers);
        });
    }

    async #getBonusNumber(winningLotto) {
        return this.#retryOnError(async () => {
            const bonusNumber = await InputView.readBonusNumber();
            Validator.validateBonusNumber(bonusNumber, winningLotto.getNumbers());
            return bonusNumber;
        });
    }

    #calculateStatistics(winningLotto, bonusNumber, purchasedLottos) {
        const winningChecker = new WinningChecker(winningLotto, bonusNumber);
        return winningChecker.createWinningStatistics(purchasedLottos);
    }
}

export default LottoGame;