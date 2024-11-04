class WinningChecker {
    #LOTTO_PRICE = 1000;
    #PRIZE_MONEY = {
        3: 5000,
        4: 50000,
        5: 1500000,
        5.5: 30000000,  // 5개 + 보너스볼
        6: 2000000000
    };

    #winningLotto;
    #bonusNumber;

    constructor(winningLotto, bonusNumber) {
        this.#winningLotto = winningLotto;
        this.#bonusNumber = bonusNumber;
    }

    checkLotto(purchasedLotto) {
        return this.#winningLotto.getMatchCount(purchasedLotto.getNumbers());
    }

    hasBonus(purchasedLotto) {
        return purchasedLotto.hasBonus(this.#bonusNumber);
    }

    createWinningStatistics(purchasedLottos) {
        const matches = this.#initializeMatches();
        let totalPrize = 0;

        purchasedLottos.forEach(lotto => {
            const matchCount = this.checkLotto(lotto);
            if (matchCount === 5 && this.hasBonus(lotto)) {
                matches[5.5]++;
                totalPrize += this.#PRIZE_MONEY[5.5];
            } else if (matchCount >= 3) {
                matches[matchCount]++;
                totalPrize += this.#PRIZE_MONEY[matchCount];
            }
        });

        const totalPurchaseAmount = purchasedLottos.length * this.#LOTTO_PRICE;
        const profitRate = (totalPrize / totalPurchaseAmount * 100).toFixed(1);

        return {
            matches,
            profitRate: parseFloat(profitRate)
        };
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
}

export default WinningChecker;