import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import Validator from "../utils/Validator.js";

class LottoGenerator {
    #LOTTO_PRICE = 1000;
    #MIN_NUMBER = 1;
    #MAX_NUMBER = 45;
    #LOTTO_SIZE = 6;

    generate(amount) {
        Validator.validatePurchaseAmount(amount);

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
}

export default LottoGenerator;