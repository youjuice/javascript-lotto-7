import { Console } from '@woowacourse/mission-utils';

class OutputView {
    static #PRIZE_MONEY = {
        3: 5000,
        4: 50000,
        5: 1500000,
        5.5: 30000000,  // 5개 + 보너스볼
        6: 2000000000
    };

    static printPurchasedLottos(lottos) {
        Console.print(`${lottos.length}개를 구매했습니다.`);
        lottos.forEach(lotto => {
            Console.print(`[${lotto.getNumbers().join(', ')}]`);
        });
    }

    static printWinningStatistics(result) {
        Console.print('\n당첨 통계\n---');
        this.#printPrizeResult(3, result.matches[3]);
        this.#printPrizeResult(4, result.matches[4]);
        this.#printPrizeResult(5, result.matches[5]);
        this.#printBonusPrizeResult(result.matches[5.5]);
        this.#printPrizeResult(6, result.matches[6]);
        Console.print(`총 수익률은 ${result.profitRate}%입니다.`);
    }

    static #printPrizeResult(matchCount, winners) {
        const prize = this.#formatPrizeMoney(this.#PRIZE_MONEY[matchCount]);
        Console.print(`${matchCount}개 일치 (${prize}원) - ${winners}개`);
    }

    static #printBonusPrizeResult(winners) {
        const prize = this.#formatPrizeMoney(this.#PRIZE_MONEY[5.5]);
        Console.print(`5개 일치, 보너스 볼 일치 (${prize}원) - ${winners}개`);
    }

    static #formatPrizeMoney(amount) {
        return amount.toLocaleString();
    }
}

export default OutputView;