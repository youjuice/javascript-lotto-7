class WinningChecker {
    static LOTTO_PRICE = 1000;
    static PRIZE_MONEY = {
        3: 5000,
        4: 50000,
        5: 1500000,
        5.5: 30000000,
        6: 2000000000
    };

    #winningLotto;
    #bonusNumber;

    constructor(winningLotto, bonusNumber) {
        this.#winningLotto = winningLotto;
        this.#bonusNumber = bonusNumber;
    }

    createWinningStatistics(purchasedLottos) {
        const matches = this.#initializeMatches();
        const totalPrize = this.#calculateTotalPrize(purchasedLottos, matches);
        const profitRate = this.#calculateProfitRate(totalPrize, purchasedLottos.length);

        return { matches, profitRate };
    }

    #calculateTotalPrize(purchasedLottos, matches) {
        return purchasedLottos.reduce((total, lotto) => {
            const prize = this.#getPrizeForLotto(lotto, matches);
            return total + prize;
        }, 0);
    }

    #getPrizeForLotto(lotto, matches) {
        const matchCount = this.checkLotto(lotto);
        const rank = this.#determineRank(matchCount, this.hasBonus(lotto));

        if (!rank) {
            return 0;
        }

        matches[rank]++;
        return WinningChecker.PRIZE_MONEY[rank];
    }

    #determineRank(matchCount, hasBonus) {
        if (matchCount === 6) {
            return 6;
        }
        if (matchCount === 5 && hasBonus) {
            return 5.5;
        }
        if (matchCount >= 3) {
            return matchCount;
        }
        return null;
    }

    #calculateProfitRate(totalPrize, lottoCount) {
        const totalPurchaseAmount = lottoCount * WinningChecker.LOTTO_PRICE;
        return parseFloat((totalPrize / totalPurchaseAmount * 100).toFixed(1));
    }

    #initializeMatches() {
        return {
            3: 0,
            4: 0,
            5: 0,
            5.5: 0,
            6: 0
        };
    }

    checkLotto(purchasedLotto) {
        return this.#winningLotto.getMatchCount(purchasedLotto.getNumbers());
    }

    hasBonus(purchasedLotto) {
        return purchasedLotto.hasBonus(this.#bonusNumber);
    }
}

export default WinningChecker;