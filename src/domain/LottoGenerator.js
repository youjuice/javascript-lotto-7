import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class LottoGenerator {
    #LOTTO_PRICE = 1000;
    #MIN_NUMBER = 1;
    #MAX_NUMBER = 45;
    #LOTTO_SIZE = 6;

    generate(amount) {
        this.#validateAmount(amount);

        const lottoCount = amount / this.#LOTTO_PRICE;
        const lottos = [];

        for (let i = 0; i < lottoCount; i++) {
            const numbers = Random.pickUniqueNumbersInRange(
                this.#MIN_NUMBER,
                this.#MAX_NUMBER,
                this.#LOTTO_SIZE
            );
            lottos.push(new Lotto(numbers));
        }

        return lottos;
    }

    #validateAmount(amount) {
        if (amount < this.#LOTTO_PRICE) {
            throw new Error('[ERROR] 구매 금액은 1000원 이상이어야 합니다.');
        }

        if (amount % this.#LOTTO_PRICE !== 0) {
            throw new Error('[ERROR] 구매 금액은 1000원 단위여야 합니다.');
        }
    }
}

export default LottoGenerator;